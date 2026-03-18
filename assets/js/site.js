// Shared site JS — nav scroll, hamburger menu, scroll reveal, focus trap, theme toggle

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

// Nav scroll effect
var nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// Hamburger menu (with aria-expanded for accessibility)
var hamburger = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', function() {
    var isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen) {
      // Focus the first link in mobile menu
      var firstLink = mobileMenu.querySelector('a');
      if (firstLink) firstLink.focus();
    }
  });

  // Escape key closes mobile menu
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMobile();
      hamburger.focus();
    }
  });

  // Focus trap — keep Tab within mobile menu when open
  mobileMenu.addEventListener('keydown', function(e) {
    if (e.key !== 'Tab' || !mobileMenu.classList.contains('open')) return;
    var focusable = mobileMenu.querySelectorAll('a[href], button');
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
}

function closeMobile() {
  if (hamburger && mobileMenu) {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
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
