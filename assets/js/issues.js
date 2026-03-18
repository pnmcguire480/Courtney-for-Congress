// Issues page — collapsible cite blocks
document.querySelectorAll('.cite-block').forEach(function(block) {
  block.addEventListener('click', function() { block.classList.toggle('open'); });
});
