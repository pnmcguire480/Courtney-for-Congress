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
        noEvents.innerHTML = '<p>No upcoming events in this category right now.<br>Check back soon or <a href="get-involved.html" style="color:var(--coral);font-weight:700">sign up to host one</a>.</p>';
        document.getElementById('eventsGrid').appendChild(noEvents);
      }
    } else if (noEvents) {
      noEvents.remove();
    }
  });
});
