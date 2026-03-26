// Issues page — collapsible cite blocks
document.querySelectorAll('.cite-block').forEach(function(block) {
  // Make cite-blocks accessible as disclosure widgets
  block.setAttribute('tabindex', '0');
  block.setAttribute('role', 'button');
  block.setAttribute('aria-expanded', 'false');
  var heading = block.querySelector('h3, h4, h5, strong');
  if (heading) block.setAttribute('aria-label', 'Toggle sources: ' + heading.textContent.trim());

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
