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

var clickablePhotos = Array.from(document.querySelectorAll('.photo-item[data-src]'));
var currentIdx = 0;

function openLightbox(idx) {
  currentIdx = idx;
  var item = clickablePhotos[idx];
  lbImg.src = item.dataset.src;
  lbImg.alt = item.querySelector('img').alt;
  lbLabel.textContent = item.dataset.categoryLabel || '';
  lbText.textContent = item.dataset.caption || '';
  lbCounter.textContent = (idx + 1) + ' / ' + clickablePhotos.length;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
  lbImg.focus();
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  clickablePhotos[currentIdx].focus();
}

clickablePhotos.forEach(function(item, idx) {
  item.addEventListener('click', function() { openLightbox(idx); });
  item.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(idx); } });
});

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', function() { openLightbox((currentIdx - 1 + clickablePhotos.length) % clickablePhotos.length); });
document.getElementById('lightboxNext').addEventListener('click', function() { openLightbox((currentIdx + 1) % clickablePhotos.length); });

lightbox.addEventListener('click', function(e) { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', function(e) {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') openLightbox((currentIdx - 1 + clickablePhotos.length) % clickablePhotos.length);
  if (e.key === 'ArrowRight') openLightbox((currentIdx + 1) % clickablePhotos.length);
});
