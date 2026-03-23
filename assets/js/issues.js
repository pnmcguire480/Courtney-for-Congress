// Issues page — collapsible cite blocks
document.querySelectorAll('.cite-block').forEach(function(block) {
  // Make cite-blocks accessible as disclosure widgets
  block.setAttribute('tabindex', '0');
  block.setAttribute('role', 'button');
  block.setAttribute('aria-expanded', 'false');

  block.addEventListener('click', function() {
    block.classList.toggle('open');
    block.setAttribute('aria-expanded', block.classList.contains('open') ? 'true' : 'false');
  });

  block.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      block.classList.toggle('open');
      block.setAttribute('aria-expanded', block.classList.contains('open') ? 'true' : 'false');
    }
  });
});
