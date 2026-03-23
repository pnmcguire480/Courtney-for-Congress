// Endorsements page — endorsement form AJAX
document.getElementById('endorseForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var form = this;
  var success = document.getElementById('endorseSuccess');
  var data = new FormData(form);
  fetch('/', { method: 'POST', body: data })
    .then(function(r) {
      if (r.ok) {
        form.style.display = 'none';
        success.style.display = 'block';
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        var btn = form.querySelector('button');
        btn.textContent = 'Try again';
        btn.disabled = false;
      }
    })
    .catch(function() { form.submit(); });
});
