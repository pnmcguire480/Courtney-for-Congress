// Signup form AJAX handling — Spanish
document.querySelectorAll(".signup-form").forEach(function(form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    var btn = form.querySelector("button");
    if (btn) {
      btn.textContent = "Enviando...";
      btn.disabled = true;
    }
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString()
    }).then(function(r) {
      if (r.ok) {
        form.innerHTML = '<p style="color:var(--coral);font-weight:700;padding:0.5rem 0">\u00a1Te has registrado!</p>';
      } else if (btn) {
        btn.textContent = "Intentar de nuevo";
        btn.disabled = false;
      }
    }).catch(function() {
      if (btn) {
        btn.textContent = "Intentar de nuevo";
        btn.disabled = false;
      }
    });
  });
});
