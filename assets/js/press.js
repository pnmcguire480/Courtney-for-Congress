// Press page — clipboard copy helpers
function copyBio(id, btn) {
  var text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text).then(function() {
    btn.textContent = '\u2713 Copied!';
    btn.classList.add('copied');
    setTimeout(function() { btn.textContent = '\uD83D\uDCCB Copy'; btn.classList.remove('copied'); }, 2000);
  }).catch(function() {
    btn.textContent = 'Copy failed';
    setTimeout(function() { btn.textContent = '\uD83D\uDCCB Copy'; }, 2000);
  });
}

function copyLongBio(btn) {
  var ids = ['long-bio-1', 'long-bio-2', 'long-bio-3', 'long-bio-4'];
  var text = ids.map(function(id) { return document.getElementById(id).innerText; }).join('\n\n');
  navigator.clipboard.writeText(text).then(function() {
    btn.textContent = '\u2713 Copied!';
    btn.classList.add('copied');
    setTimeout(function() { btn.textContent = '\uD83D\uDCCB Copy'; btn.classList.remove('copied'); }, 2000);
  }).catch(function() {
    btn.textContent = 'Copy failed';
    setTimeout(function() { btn.textContent = '\uD83D\uDCCB Copy'; }, 2000);
  });
}

function copyBoilerplate(btn) {
  var text = btn.previousElementSibling.innerText;
  navigator.clipboard.writeText(text).then(function() {
    btn.textContent = '\u2713 Copied!';
    btn.classList.add('copied');
    setTimeout(function() { btn.textContent = '\uD83D\uDCCB Copy'; btn.classList.remove('copied'); }, 2000);
  }).catch(function() {
    btn.textContent = 'Copy failed';
    setTimeout(function() { btn.textContent = '\uD83D\uDCCB Copy'; }, 2000);
  });
}
