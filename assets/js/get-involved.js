// Get Involved page — volunteer form AJAX
document.getElementById('volunteerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var form = this;
  var success = document.getElementById('formSuccess');
  var data = new FormData(form);
  fetch('/', { method: 'POST', body: data })
    .then(function() {
      form.style.display = 'none';
      success.style.display = 'block';
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    })
    .catch(function() {
      form.submit();
    });
});
