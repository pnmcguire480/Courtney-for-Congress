// Shared site JS — nav scroll, hamburger menu, scroll reveal, focus trap, theme toggle

// === Scroll lock helper (works on iOS Safari) ===
var scrollLockPos = 0;
function lockScroll() {
  scrollLockPos = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = '-' + scrollLockPos + 'px';
  document.body.style.width = '100%';
}
function unlockScroll() {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, scrollLockPos);
}

// Theme toggle — dark/light mode with localStorage persistence
(function() {
  var html = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var mobileToggle = document.getElementById('mobileThemeToggle');

  function isDark() {
    return html.getAttribute('data-theme') === 'dark' ||
      (!html.hasAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  function updateLabels() {
    var dark = isDark();
    var label = dark ? 'Switch to light mode' : 'Switch to dark mode';
    if (toggle) toggle.setAttribute('aria-label', label);
    if (mobileToggle) mobileToggle.setAttribute('aria-label', label);
  }

  function flipTheme() {
    var next = isDark() ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateLabels();
  }

  if (toggle) toggle.addEventListener('click', flipTheme);
  if (mobileToggle) mobileToggle.addEventListener('click', flipTheme);

  // Update labels on load
  updateLabels();

  // Listen for system preference changes (when no manual override)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
    if (!localStorage.getItem('theme')) updateLabels();
  });
})()

// Nav scroll effect (throttled with rAF, passive listener)
var nav = document.getElementById('nav');
if (nav) {
  var navTicking = false;
  window.addEventListener('scroll', function() {
    if (!navTicking) {
      requestAnimationFrame(function() {
        nav.classList.toggle('scrolled', window.scrollY > 50);
        navTicking = false;
      });
      navTicking = true;
    }
  }, { passive: true });
}

// Hamburger menu (with aria-expanded, aria-modal, aria-label toggling)
var hamburger = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', function() {
    var isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    mobileMenu.setAttribute('aria-modal', String(isOpen));
    if (isOpen) {
      lockScroll();
      // Focus the first link in mobile menu
      var firstLink = mobileMenu.querySelector('a');
      if (firstLink) firstLink.focus();
    } else {
      unlockScroll();
    }
  });

  // Escape key closes mobile menu
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMobile();
      hamburger.focus();
    }
  });

  // Focus trap — keep Tab within mobile menu when open (includes hamburger button)
  mobileMenu.addEventListener('keydown', function(e) {
    if (e.key !== 'Tab' || !mobileMenu.classList.contains('open')) return;
    var focusable = [hamburger].concat(
      Array.from(mobileMenu.querySelectorAll('a[href], button'))
    );
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Close button inside mobile menu
  var closeBtn = mobileMenu.querySelector('.mobile-menu-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      closeMobile();
      hamburger.focus();
    });
  }

  // Attach closeMobile to all mobile menu links (replaces inline onclick)
  var mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(function(link) {
    link.addEventListener('click', closeMobile);
  });
}

window.addEventListener('resize', function() {
  if (window.innerWidth >= 768 && mobileMenu && mobileMenu.classList.contains('open')) {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    mobileMenu.setAttribute('aria-modal', 'false');
    unlockScroll();
  }
});

function closeMobile() {
  if (hamburger && mobileMenu) {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    mobileMenu.setAttribute('aria-modal', 'false');
    unlockScroll();
  }
}

// Accessible nav dropdowns — keyboard + touch support alongside existing hover behavior
// Implements WCAG 2.1 SC 2.1.1 (Keyboard) and ARIA menu pattern
(function() {
  var dropdowns = document.querySelectorAll('.nav-dropdown');
  if (!dropdowns.length) return;

  // Close a single dropdown and update ARIA state
  function closeDropdown(dropdown) {
    dropdown.classList.remove('open');
    var trigger = dropdown.querySelector(':scope > a');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  }

  // Open a single dropdown, close siblings, and update ARIA state
  function openDropdown(dropdown) {
    // Close all other dropdowns first
    dropdowns.forEach(function(d) {
      if (d !== dropdown) closeDropdown(d);
    });
    dropdown.classList.add('open');
    var trigger = dropdown.querySelector(':scope > a');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
  }

  // Close all dropdowns
  function closeAllDropdowns() {
    dropdowns.forEach(function(d) { closeDropdown(d); });
  }

  // Get focusable menu items within a dropdown menu
  function getMenuItems(dropdown) {
    var menu = dropdown.querySelector('.nav-dropdown-menu');
    return menu ? menu.querySelectorAll('a[href]') : [];
  }

  // Set up each dropdown
  dropdowns.forEach(function(dropdown) {
    var trigger = dropdown.querySelector(':scope > a');
    if (!trigger) return;

    // Initialize ARIA attributes via JS (HTML attrs added separately)
    if (!trigger.hasAttribute('aria-expanded')) {
      trigger.setAttribute('aria-expanded', 'false');
    }
    if (!trigger.hasAttribute('aria-haspopup')) {
      trigger.setAttribute('aria-haspopup', 'true');
    }

    // Touch/click handler — first tap opens dropdown, second tap follows link
    trigger.addEventListener('click', function(e) {
      // Only intercept on touch-capable devices where hover doesn't work
      var isOpen = dropdown.classList.contains('open');
      if (!isOpen) {
        e.preventDefault();
        openDropdown(dropdown);
      }
      // If already open, let the click navigate to the href
    });

    // Keyboard handler on the trigger link
    trigger.addEventListener('keydown', function(e) {
      var isOpen = dropdown.classList.contains('open');
      var items = getMenuItems(dropdown);

      switch (e.key) {
        case 'Enter':
        case ' ':
          // Toggle dropdown open/closed
          e.preventDefault();
          if (isOpen) {
            closeDropdown(dropdown);
          } else {
            openDropdown(dropdown);
            // Focus the first menu item
            if (items.length) items[0].focus();
          }
          break;

        case 'ArrowDown':
          // Open and focus first item (or focus first item if already open)
          e.preventDefault();
          if (!isOpen) openDropdown(dropdown);
          items = getMenuItems(dropdown); // re-query after open
          if (items.length) items[0].focus();
          break;

        case 'ArrowUp':
          // Open and focus last item
          e.preventDefault();
          if (!isOpen) openDropdown(dropdown);
          items = getMenuItems(dropdown);
          if (items.length) items[items.length - 1].focus();
          break;

        case 'Escape':
          if (isOpen) {
            e.preventDefault();
            closeDropdown(dropdown);
            trigger.focus();
          }
          break;
      }
    });

    // Keyboard handler on menu items inside the dropdown
    var menu = dropdown.querySelector('.nav-dropdown-menu');
    if (menu) {
      menu.addEventListener('keydown', function(e) {
        var items = getMenuItems(dropdown);
        if (!items.length) return;

        // Find current index
        var currentIndex = -1;
        for (var i = 0; i < items.length; i++) {
          if (items[i] === document.activeElement) { currentIndex = i; break; }
        }

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            // Move to next item, wrap to first
            var nextIndex = (currentIndex + 1) % items.length;
            items[nextIndex].focus();
            break;

          case 'ArrowUp':
            e.preventDefault();
            // Move to previous item, wrap to last
            var prevIndex = (currentIndex - 1 + items.length) % items.length;
            items[prevIndex].focus();
            break;

          case 'Escape':
            e.preventDefault();
            closeDropdown(dropdown);
            trigger.focus();
            break;

          case 'Tab':
            // Let Tab move naturally but close the dropdown
            closeDropdown(dropdown);
            break;

          case 'Home':
            e.preventDefault();
            items[0].focus();
            break;

          case 'End':
            e.preventDefault();
            items[items.length - 1].focus();
            break;
        }
      });
    }
  });

  // Click outside closes all dropdowns
  document.addEventListener('click', function(e) {
    var insideDropdown = false;
    dropdowns.forEach(function(d) {
      if (d.contains(e.target)) insideDropdown = true;
    });
    if (!insideDropdown) closeAllDropdowns();
  });

  // Global Escape key closes any open dropdown (when focus is elsewhere)
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeAllDropdowns();
  });
})();

// Signature countdown timer (May 4, 2026 11:59 PM ET)
var sigCountdownEl = document.getElementById('sigCountdown');
if (sigCountdownEl) {
  var sigDeadline = new Date('2026-05-04T23:59:59-04:00').getTime();
  var sigIntervalId = null;
  function updateSigCountdown() {
    var now = Date.now();
    var diff = sigDeadline - now;
    if (diff <= 0) {
      sigCountdownEl.innerHTML = '<strong>Deadline passed</strong>';
      if (sigIntervalId) { clearInterval(sigIntervalId); sigIntervalId = null; }
      return;
    }
    var days = Math.floor(diff / 86400000);
    var hours = Math.floor((diff % 86400000) / 3600000);
    var mins = Math.floor((diff % 3600000) / 60000);
    sigCountdownEl.innerHTML = '<strong>' + days + '</strong>d <strong>' + hours + '</strong>h <strong>' + mins + '</strong>m left';
  }
  updateSigCountdown();
  sigIntervalId = setInterval(updateSigCountdown, 60000);
}

// Scroll reveal animations (respects prefers-reduced-motion via CSS)
var reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    // Show all elements immediately without animation
    reveals.forEach(function(el) { el.classList.add('visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(function(el) { revealObserver.observe(el); });
  }
}
