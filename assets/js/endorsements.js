// Endorsements page — endorsement form AJAX
document.getElementById('endorseForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var form = this;
  var success = document.getElementById('endorseSuccess');
  var data = new FormData(form);
  fetch('/', { method: 'POST', body: data })
    .then(function() {
      form.style.display = 'none';
      success.style.display = 'block';
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    })
    .catch(function() { form.submit(); });
});
