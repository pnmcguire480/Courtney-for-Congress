// Signup form AJAX handling — auto-detects language from <html lang>
(function() {
  var isEs = document.documentElement.lang === 'es';
  var strings = isEs
    ? { sending: 'Enviando...', success: '\u00a1Te has registrado!', retry: 'Intentar de nuevo' }
    : { sending: 'Sending...', success: 'You are signed up!', retry: 'Try again' };

  document.querySelectorAll(".signup-form").forEach(function(form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      var btn = form.querySelector("button");
      if (btn) {
        if (btn.disabled) return;
        btn.textContent = strings.sending;
        btn.disabled = true;
      }
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString()
      }).then(function(r) {
        if (r.ok) {
          form.innerHTML = '<p style="color:var(--coral);font-weight:700;padding:0.5rem 0">' + strings.success + '</p>';
        } else if (btn) {
          btn.textContent = strings.retry;
          btn.disabled = false;
        }
      }).catch(function() {
        if (btn) {
          btn.textContent = strings.retry;
          btn.disabled = false;
        }
      });
    });
  });
})();
