// Issues page — collapsible cite blocks
document.querySelectorAll('.cite-block').forEach(function(block) {
  var label = block.querySelector('.cite-label');
  if (!label) return;

  // Make the cite-label the accessible toggle control
  label.setAttribute('tabindex', '0');

  function toggle() {
    block.classList.toggle('open');
    var expanded = block.classList.contains('open');
    label.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  }

  block.addEventListener('click', toggle);

  label.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });
});
