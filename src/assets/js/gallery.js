// Gallery page — photo filter + lightbox

// Filter
var filterBtns = document.querySelectorAll('.filter-btn');
var allPhotos = document.querySelectorAll('.photo-item');
filterBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    filterBtns.forEach(function(b) { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    var f = btn.dataset.filter;
    allPhotos.forEach(function(p) {
      var show = f === 'all' || p.dataset.category === f;
      p.style.display = show ? '' : 'none';
    });
  });
});

// Lightbox
var lightbox = document.getElementById('lightbox');
var lbImg = document.getElementById('lightboxImg');
var lbLabel = document.getElementById('lightboxLabel');
var lbText = document.getElementById('lightboxText');
var lbCounter = document.getElementById('lightboxCounter');
if (lightbox && !lightbox.hasAttribute('tabindex')) lightbox.setAttribute('tabindex', '-1');

var clickablePhotos = Array.from(document.querySelectorAll('.photo-item[data-src]'));
var currentIdx = 0;
var touchMoved = false;

function openLightbox(idx) {
  currentIdx = idx;
  var item = clickablePhotos[idx];
  if (lbImg) {
    lbImg.src = item.dataset.src;
    lbImg.alt = item.querySelector('img').alt;
  }
  if (lbLabel) lbLabel.textContent = item.dataset.categoryLabel || '';
  if (lbText) lbText.textContent = item.dataset.caption || '';
  if (lbCounter) lbCounter.textContent = (idx + 1) + ' / ' + clickablePhotos.length;
  if (lightbox) {
    lightbox.classList.add('open');
    lockScroll();
    lightbox.focus();
  }
}

function closeLightbox() {
  if (lightbox) lightbox.classList.remove('open');
  unlockScroll();
  if (clickablePhotos[currentIdx]) clickablePhotos[currentIdx].focus();
}

clickablePhotos.forEach(function(item, idx) {
  item.addEventListener('click', function() { openLightbox(idx); });
  item.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(idx); } });
});

var lbClose = document.getElementById('lightboxClose');
var lbPrev = document.getElementById('lightboxPrev');
var lbNext = document.getElementById('lightboxNext');
if (lbClose) lbClose.addEventListener('click', closeLightbox);
if (lbPrev) lbPrev.addEventListener('click', function() { openLightbox((currentIdx - 1 + clickablePhotos.length) % clickablePhotos.length); });
if (lbNext) lbNext.addEventListener('click', function() { openLightbox((currentIdx + 1) % clickablePhotos.length); });

if (lightbox) lightbox.addEventListener('click', function(e) { if (touchMoved) { touchMoved = false; return; } if (e.target === lightbox) closeLightbox(); });

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  if (!lightbox || !lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') openLightbox((currentIdx - 1 + clickablePhotos.length) % clickablePhotos.length);
  if (e.key === 'ArrowRight') openLightbox((currentIdx + 1) % clickablePhotos.length);
});

// Touch swipe support for mobile
(function() {
  if (!lightbox) return;
  var touchStartX = 0;
  var touchEndX = 0;
  lightbox.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchMoved = false;
  }, { passive: true });
  lightbox.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    var diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 10) {
      touchMoved = true;
    }
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        openLightbox((currentIdx + 1) % clickablePhotos.length);
      } else {
        openLightbox((currentIdx - 1 + clickablePhotos.length) % clickablePhotos.length);
      }
    }
  }, { passive: true });
})();
