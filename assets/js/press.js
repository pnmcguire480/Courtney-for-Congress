// Press page — clipboard copy helpers with fallback for older mobile browsers

function safeCopy(text, btn) {
  function showResult(success) {
    if (success) {
      btn.textContent = '\u2713 Copied!';
      btn.classList.add('copied');
    } else {
      btn.textContent = 'Copy failed';
    }
    setTimeout(function() { btn.textContent = '\uD83D\uDCCB Copy'; btn.classList.remove('copied'); }, 2000);
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function() {
      showResult(true);
    }).catch(function() {
      fallbackCopy(text, btn, showResult);
    });
  } else {
    fallbackCopy(text, btn, showResult);
  }
}

function fallbackCopy(text, btn, showResult) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  ta.setSelectionRange(0, 99999);
  try {
    document.execCommand('copy');
    showResult(true);
  } catch (e) {
    showResult(false);
  }
  document.body.removeChild(ta);
}

function copyBio(id, btn) {
  var text = document.getElementById(id).innerText;
  safeCopy(text, btn);
}

function copyLongBio(btn) {
  var ids = ['long-bio-1', 'long-bio-2', 'long-bio-3', 'long-bio-4'];
  var text = ids.map(function(id) { return document.getElementById(id).innerText; }).join('\n\n');
  safeCopy(text, btn);
}

function copyBoilerplate(btn) {
  var text = btn.previousElementSibling.innerText;
  safeCopy(text, btn);
}
