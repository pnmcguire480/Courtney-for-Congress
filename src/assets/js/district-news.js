// District News — RSS feed aggregator for OH-11
// Fetches local news via rss2json.com (free, no API key, CORS-enabled)

var FEEDS = [
  { url: 'https://www.cleveland.com/arc/outboundfeeds/rss/category/news/politics/?outputType=xml', source: 'Cleveland.com', category: 'Politics', color: '#1a73e8' },
  { url: 'https://www.cleveland.com/arc/outboundfeeds/rss/category/news/local/?outputType=xml', source: 'Cleveland.com', category: 'Local News', color: '#1a73e8' },
  { url: 'https://fox8.com/news/politics/feed/', source: 'Fox 8', category: 'Politics', color: '#003b6f' },
  { url: 'https://fox8.com/news/local/feed/', source: 'Fox 8', category: 'Local News', color: '#003b6f' },
  { url: 'https://www.wkyc.com/feeds/syndication/rss/news/politics', source: 'WKYC', category: 'Politics', color: '#0066cc' },
  { url: 'https://www.wkyc.com/feeds/syndication/rss/news/local', source: 'WKYC', category: 'Local News', color: '#0066cc' },
  { url: 'https://signalcleveland.org/feed/', source: 'Signal Cleveland', category: 'Community', color: '#2d8659' },
  { url: 'https://thelandcle.org/feed/', source: 'The Land', category: 'Community', color: '#8b4513' },
  { url: 'https://eyeonohio.com/feed/', source: 'Eye on Ohio', category: 'Watchdog', color: '#cc3300' },
  { url: 'https://www.clevescene.com/feed/?partner-feed=news-views', source: 'Cleveland Scene', category: 'Local News', color: '#e63946' }
];

var RSS_API = 'https://api.rss2json.com/v1/api.json?rss_url=';
var ITEMS_PER_PAGE = 30;
var allItems = [];
var visibleCount = 0;
var activeFilter = 'all';

function loadAllFeeds() {
  var container = document.getElementById('newsFeed');
  var loading = document.getElementById('newsLoading');
  if (!container) return;

  var fetches = FEEDS.map(function(feed) {
    return fetch(RSS_API + encodeURIComponent(feed.url))
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data.status !== 'ok' || !data.items) return [];
        return data.items.map(function(item) {
          return {
            title: item.title || '',
            link: item.link || '',
            pubDate: new Date(item.pubDate),
            description: stripHtml(item.description || '').slice(0, 200),
            thumbnail: item.thumbnail || item.enclosure && item.enclosure.link || '',
            source: feed.source,
            category: feed.category,
            color: feed.color
          };
        });
      })
      .catch(function() { return []; });
  });

  Promise.all(fetches).then(function(results) {
    allItems = [].concat.apply([], results);
    allItems = deduplicateItems(allItems);
    allItems.sort(function(a, b) { return b.pubDate - a.pubDate; });

    if (loading) loading.style.display = 'none';

    if (allItems.length === 0) {
      container.innerHTML = '<div class="news-error"><p>No news articles available right now.</p><p>Visit our sources directly:</p>' + buildSourceLinks() + '</div>';
      return;
    }

    renderItems();
    updateFilterCounts();
  });
}

function renderItems() {
  var container = document.getElementById('newsFeed');
  if (!container) return;
  var filtered = activeFilter === 'all' ? allItems : allItems.filter(function(item) {
    return item.category === activeFilter;
  });

  var frag = document.createDocumentFragment();
  var end = Math.min(visibleCount + ITEMS_PER_PAGE, filtered.length);

  for (var i = visibleCount; i < end; i++) {
    frag.appendChild(buildNewsCard(filtered[i]));
  }

  if (visibleCount === 0) container.innerHTML = '';
  container.appendChild(frag);
  visibleCount = end;

  var loadMore = document.getElementById('loadMoreBtn');
  if (loadMore) {
    loadMore.style.display = visibleCount >= filtered.length ? 'none' : 'inline-block';
  }
}

function buildNewsCard(item) {
  var article = document.createElement('article');
  article.className = 'news-card reveal visible';
  article.setAttribute('data-category', item.category);

  var timeAgo = relativeTime(item.pubDate);
  var excerpt = item.description;
  if (excerpt.length >= 195) excerpt = excerpt.slice(0, excerpt.lastIndexOf(' ', 195)) + '...';

  article.innerHTML =
    '<div class="news-card-body">' +
      '<div class="news-card-meta">' +
        '<span class="news-source-badge" style="background:' + item.color + '">' + item.source + '</span>' +
        '<span class="news-category-tag">' + item.category + '</span>' +
        '<span class="news-time">' + timeAgo + '</span>' +
      '</div>' +
      '<h3 class="news-card-title"><a href="' + escapeAttr(item.link) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(item.title) + '</a></h3>' +
      (excerpt ? '<p class="news-card-excerpt">' + escapeHtml(excerpt) + '</p>' : '') +
    '</div>' +
    (item.thumbnail ? '<div class="news-card-thumb"><img src="' + escapeAttr(item.thumbnail) + '" alt="" loading="lazy"></div>' : '');

  return article;
}

function deduplicateItems(items) {
  var seen = {};
  return items.filter(function(item) {
    var key = item.title.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 60);
    if (seen[key]) return false;
    seen[key] = true;
    return true;
  });
}

function relativeTime(date) {
  var diff = Date.now() - date.getTime();
  var mins = Math.floor(diff / 60000);
  if (mins < 60) return mins + 'm ago';
  var hours = Math.floor(mins / 60);
  if (hours < 24) return hours + 'h ago';
  var days = Math.floor(hours / 24);
  if (days < 30) return days + 'd ago';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function stripHtml(html) {
  var tmp = document.createElement('div');
  tmp.innerHTML = html;
  return (tmp.textContent || tmp.innerText || '').trim();
}

function escapeHtml(str) {
  var el = document.createElement('span');
  el.textContent = str;
  return el.innerHTML;
}

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;');
}

function buildSourceLinks() {
  var links = [
    { name: 'Cleveland.com', url: 'https://www.cleveland.com/news/' },
    { name: 'Fox 8', url: 'https://fox8.com/news/local/' },
    { name: 'WKYC', url: 'https://www.wkyc.com/local' },
    { name: 'Signal Cleveland', url: 'https://signalcleveland.org/' },
    { name: 'The Land', url: 'https://thelandcle.org/' },
    { name: 'Eye on Ohio', url: 'https://eyeonohio.com/' },
    { name: 'Cleveland Scene', url: 'https://www.clevescene.com/' }
  ];
  return '<div class="news-source-links">' + links.map(function(l) {
    return '<a href="' + l.url + '" target="_blank" rel="noopener noreferrer">' + l.name + '</a>';
  }).join('') + '</div>';
}

function updateFilterCounts() {
  var counts = { all: allItems.length };
  allItems.forEach(function(item) {
    counts[item.category] = (counts[item.category] || 0) + 1;
  });
  document.querySelectorAll('.filter-btn').forEach(function(btn) {
    var filter = btn.getAttribute('data-filter');
    var count = counts[filter] || 0;
    var countEl = btn.querySelector('.filter-count');
    if (countEl) countEl.textContent = filter === 'all' ? counts.all : count;
  });
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(function(b) {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    activeFilter = btn.getAttribute('data-filter');
    visibleCount = 0;
    renderItems();
  });
});

// Load more
var loadMoreBtn = document.getElementById('loadMoreBtn');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', renderItems);
}

// Init
loadAllFeeds();
