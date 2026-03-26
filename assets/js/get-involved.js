// Get Involved page — volunteer form AJAX
var volunteerForm = document.getElementById('volunteerForm');
if (volunteerForm) {
  volunteerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var form = this;
    var btn = form.querySelector('button');
    if (btn) {
      if (btn.disabled) return;
      btn.disabled = true;
      btn.textContent = 'Sending...';
    }
    var success = document.getElementById('formSuccess');
    var data = new FormData(form);
    fetch('/', { method: 'POST', body: data })
      .then(function() {
        form.style.display = 'none';
        if (success) {
          success.style.display = 'block';
          success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      })
      .catch(function() {
        form.submit();
      });
  });
}
