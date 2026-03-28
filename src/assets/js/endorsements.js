// Endorsements page — endorsement form AJAX
var endorseForm = document.getElementById('endorseForm');
if (endorseForm) {
  endorseForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var form = this;
    var btn = form.querySelector('button');
    if (btn) {
      if (btn.disabled) return;
      btn.disabled = true;
      btn.textContent = 'Sending...';
    }
    var success = document.getElementById('endorseSuccess');
    var data = new FormData(form);
    fetch('/', { method: 'POST', body: data })
      .then(function(r) {
        if (r.ok) {
          form.style.display = 'none';
          if (success) {
            success.style.display = 'block';
            success.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } else {
          var btn = form.querySelector('button');
          if (btn) {
            btn.textContent = 'Try again';
            btn.disabled = false;
          }
        }
      })
      .catch(function() { form.submit(); });
  });
}
