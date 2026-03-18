// Signup form AJAX handling
document.querySelectorAll(".signup-form").forEach(function(form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    var btn = form.querySelector("button");
    btn.textContent = "Sending...";
    btn.disabled = true;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString()
    }).then(function(r) {
      if (r.ok) {
        form.innerHTML = '<p style="color:var(--coral);font-weight:700;padding:0.5rem 0">You are signed up!</p>';
      } else {
        btn.textContent = "Try again";
        btn.disabled = false;
      }
    }).catch(function() {
      btn.textContent = "Try again";
      btn.disabled = false;
    });
  });
});
