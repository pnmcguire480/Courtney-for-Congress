// Homepage — active nav tab based on scroll position
(function() {
  var sections = document.querySelectorAll('section[id], .meet[id]');
  var navLinks = document.querySelectorAll('.nav-links a:not(.nav-donate)');
  var ticking = false;
  function setActive() {
    var scrollY = window.scrollY + 120;
    var current = '';
    sections.forEach(function(s) {
      if (scrollY >= s.offsetTop) current = s.getAttribute('id');
    });
    navLinks.forEach(function(a) {
      a.classList.remove('active');
      var href = a.getAttribute('href');
      if (href && href.indexOf('#') !== -1 && href.split('#')[1] === current) a.classList.add('active');
    });
  }
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        setActive();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  setActive();
})();

// Signature progress bar — reads data-collected/data-goal and animates on scroll
(function() {
  var wrap = document.querySelector('.sig-progress');
  if (!wrap) return;
  var collected = parseInt(wrap.getAttribute('data-collected'), 10) || 0;
  var goal = parseInt(wrap.getAttribute('data-goal'), 10) || 2200;
  var pct = Math.min(Math.round((collected / goal) * 100), 100);
  var bar = document.getElementById('sig-bar');
  var count = document.getElementById('sig-count');
  if (count) count.textContent = collected.toLocaleString();

  // Use IntersectionObserver instead of scroll listener (fire-once)
  var observer = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) {
      if (bar) bar.style.width = pct + '%';
      observer.disconnect();
    }
  }, { threshold: 0 });
  observer.observe(wrap);
})();
