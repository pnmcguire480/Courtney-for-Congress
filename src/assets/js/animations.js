// GSAP ScrollTrigger choreography — replaces CSS-only .reveal animations
// Mobile-first: simpler animations on phones, full choreography on desktop

(function() {
  'use strict';

  // If GSAP not loaded, fall back to CSS transitions (site.js IntersectionObserver handles .visible class)
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // Respect prefers-reduced-motion — show everything instantly
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var els = document.querySelectorAll('.reveal');
    for (var i = 0; i < els.length; i++) {
      els[i].style.opacity = '1';
      els[i].style.transform = 'none';
    }
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Make all .reveal elements visible immediately — GSAP will animate FROM opacity:0
  // This ensures content is NEVER permanently hidden if ScrollTrigger doesn't fire
  var allReveals = document.querySelectorAll('.reveal');
  for (var r = 0; r < allReveals.length; r++) {
    allReveals[r].style.opacity = '1';
    allReveals[r].style.transform = 'none';
  }

  // Grid selectors used for staggered card entrances
  var gridSel = '.priorities-grid, .acc-cards, .posts-grid, .facts-grid, .assets-grid';

  // -- Shared helpers --

  function revealSimple(dur, yOff) {
    var items = gsap.utils.toArray('.reveal');
    for (var i = 0; i < items.length; i++) {
      gsap.from(items[i], {
        scrollTrigger: { trigger: items[i], start: 'top 90%', toggleActions: 'play none none none' },
        y: yOff, opacity: 0, duration: dur, ease: 'power3.out'
      });
    }
  }

  function staggerCards(dur, stagger, yOff) {
    var grids = gsap.utils.toArray(gridSel);
    for (var i = 0; i < grids.length; i++) {
      gsap.from(grids[i].children, {
        scrollTrigger: { trigger: grids[i], start: 'top 85%', toggleActions: 'play none none none' },
        y: yOff, opacity: 0, duration: dur, stagger: stagger, ease: 'power3.out'
      });
    }
  }

  function titleSequence(labelDur, titleDur, labelX) {
    var labels = gsap.utils.toArray('.section-label');
    for (var i = 0; i < labels.length; i++) {
      var title = labels[i].nextElementSibling;
      if (title && title.classList.contains('section-title')) {
        var tl = gsap.timeline({
          scrollTrigger: { trigger: labels[i], start: 'top 85%', toggleActions: 'play none none none' }
        });
        tl.from(labels[i], { x: labelX, opacity: 0, duration: labelDur, ease: 'power2.out' })
          .from(title, { y: 20, opacity: 0, duration: titleDur, ease: 'power3.out' }, '-=0.15');
      }
    }
  }

  function sigCountUp() {
    var sigEl = document.querySelector('.sig-urgency-count strong') || document.getElementById('sig-count');
    if (!sigEl) return;
    var raw = sigEl.textContent.replace(/,/g, '');
    var target = parseInt(raw, 10);
    if (isNaN(target) || target <= 0) return;

    var obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: { trigger: sigEl, start: 'top 90%', toggleActions: 'play none none none' },
      onUpdate: function() {
        sigEl.textContent = Math.round(obj.val).toLocaleString();
      }
    });
  }

  function progressBarFill() {
    var fill = document.querySelector('.sig-urgency-fill');
    if (!fill) return;
    var targetWidth = fill.style.width;
    if (!targetWidth) return;

    gsap.fromTo(fill,
      { width: '0%' },
      {
        width: targetWidth,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: fill.parentElement || fill, start: 'top 90%', toggleActions: 'play none none none' }
      }
    );
  }

  // -- Responsive breakpoints via matchMedia --

  var mm = gsap.matchMedia();

  // Desktop: full choreography
  mm.add('(min-width: 768px)', function() {
    revealSimple(0.7, 30);
    staggerCards(0.6, 0.1, 40);
    titleSequence(0.4, 0.5, -20);
    sigCountUp();
    progressBarFill();
  });

  // Mobile: simpler, faster animations — no stagger, shorter distances
  mm.add('(max-width: 767px)', function() {
    revealSimple(0.5, 16);
    staggerCards(0.4, 0.04, 20);
    titleSequence(0.3, 0.35, -10);
    sigCountUp();
    progressBarFill();
  });
})();
