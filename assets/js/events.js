// Add to Calendar (.ics download)
function addToCal(btn) {
  var card = btn.closest('.event-card');
  if (!card) return;
  var title = card.dataset.calTitle || '';
  var start = card.dataset.calStart || '';
  var end = card.dataset.calEnd || start;
  var location = card.dataset.calLocation || '';
  var desc = card.dataset.calDesc || '';
  var ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Cortney Peterson for Congress//Events//EN',
    'BEGIN:VEVENT',
    'DTSTART;TZID=America/New_York:' + start,
    'DTEND;TZID=America/New_York:' + end,
    'SUMMARY:' + title,
    'LOCATION:' + location,
    'DESCRIPTION:' + desc,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
  var blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() + '.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Events page — filter buttons
var filterBtns = document.querySelectorAll('.filter-btn');
var eventCards = document.querySelectorAll('.event-card');

filterBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    filterBtns.forEach(function(b) { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');

    var filter = btn.dataset.filter;
    var visibleCount = 0;

    eventCards.forEach(function(card) {
      var show = filter === 'all' || card.dataset.type === filter;
      card.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    var noEvents = document.getElementById('noEventsMsg');
    if (visibleCount === 0) {
      if (!noEvents) {
        noEvents = document.createElement('div');
        noEvents.id = 'noEventsMsg';
        noEvents.className = 'no-events';
        noEvents.innerHTML = '<p>No upcoming events in this category right now.<br>Check back soon or <a href="/get-involved.html" style="color:var(--coral);font-weight:700">sign up to host one</a>.</p>';
        document.getElementById('eventsGrid').appendChild(noEvents);
      }
    } else if (noEvents) {
      noEvents.remove();
    }
  });
});
