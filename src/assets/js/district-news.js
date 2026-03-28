// District News — RSS feed aggregator + Bluesky social feed for OH-11
// Fetches local news via rss2json.com (free, no API key, CORS-enabled)
// Fetches Cortney's Bluesky posts via AT Protocol public API
// Features: source/topic/category filtering, shareable URL hashes,
//           sessionStorage caching, plan callouts, topic email capture

// ── Feed Sources ───────────────────────────────────────────

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
  { url: 'https://www.clevescene.com/feed/?partner-feed=news-views', source: 'Cleveland Scene', category: 'Local News', color: '#e63946' },
  { url: 'https://www.news5cleveland.com/index.rss', source: 'News 5', category: 'Local News', color: '#ff6600' },
  { url: 'https://www.ideastream.org/news/podcast/the-feed-from-wksu-news/rss.xml', source: 'Ideastream', category: 'Community', color: '#1b6b93' },
  { url: 'https://callandpost.com/feed/', source: 'Call & Post', category: 'Community', color: '#d4a017' }
];

// ── Topic Keywords (for issue-based filtering) ─────────────

var TOPICS = {
  'Healthcare': ['health', 'hospital', 'medical', 'medicare', 'medicaid', 'metrohealth', 'nurse', 'insurance', 'clinic', 'mental health', 'opioid', 'overdose', 'pharmacy', 'doctor', 'patient', 'uninsured', 'insulin', 'drug price', 'prescription', 'fentanyl'],
  'Housing': ['housing', 'rent', 'eviction', 'landlord', 'homeless', 'affordable', 'mortgage', 'foreclosure', 'redlining', 'zoning', 'tenant', 'apartment', 'shelter', 'hud', 'public housing', 'property tax'],
  'Corruption': ['corruption', 'pac', 'lobby', 'campaign finance', 'ethics', 'scandal', 'indicted', 'fraud', 'bribe', 'dark money', 'kickback', 'embezzle', 'conflict of interest', 'citizens united', 'insider trading'],
  'Education': ['school', 'education', 'teacher', 'student', 'cmsd', 'university', 'college', 'graduation', 'literacy', 'library', 'tuition', 'prek', 'pre-k', 'preschool', 'student debt', 'student loan', 'trade school'],
  'Jobs': ['union', 'labor', 'worker', 'wage', 'jobs', 'employment', 'layoff', 'strike', 'minimum wage', 'overtime', 'staffing', 'unemployment', 'pro act', 'workforce', 'factory', 'manufacturing']
};

// ── Plan Callouts (Cortney's platform positions per topic) ──

var PLAN_CALLOUTS = {
  'Healthcare': {
    title: "Cortney's Healthcare Plan",
    text: "As a nurse with 12 years of bedside experience, Cortney is fighting for Medicare for All \u2014 no premiums, no deductibles, no network restrictions. Coverage includes dental, vision, hearing, and mental health for every American.",
    link: 'issues.html#medicare'
  },
  'Housing': {
    title: "Cortney's Housing Plan",
    text: "Housing is a human right, not an investment vehicle for billionaires. Cortney supports massive federal investment in affordable housing, limiting corporate ownership of single-family homes, and ending homelessness through Housing First programs.",
    link: 'issues.html#housing'
  },
  'Corruption': {
    title: "Cortney's Anti-Corruption Plan",
    text: "This is a grassroots campaign that takes zero corporate PAC money. Cortney will fight to overturn Citizens United, ban Congress members from becoming lobbyists, and require mandatory stock divestment for legislators voting on related bills.",
    link: 'issues.html#corporate-influence'
  },
  'Education': {
    title: "Cortney's Education Plan",
    text: "No young person should start adult life buried in debt. Cortney supports free public college and trade schools, universal Pre-K, fully funded public schools, student debt cancellation, and robust special education funding.",
    link: 'issues.html#education'
  },
  'Jobs': {
    title: "Cortney's Jobs & Wages Plan",
    text: "Cleveland is a union town. Cortney supports a $17/hour federal minimum wage, passing the PRO Act to protect workers\u2019 right to organize, safe nurse staffing ratios, and exploring Universal Basic Income as a floor beneath which no American can fall.",
    link: 'issues.html#wages'
  }
};

// ── Constants & State ──────────────────────────────────────

var RSS_API = 'https://api.rss2json.com/v1/api.json?rss_url=';
var BSKY_API = 'https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed';
var BSKY_HANDLE = 'cortneyforcongress.bsky.social';
var ITEMS_PER_PAGE = 30;

var allItems = [];
var visibleCount = 0;
var activeFilter = 'all';
var activeTopic = null;
var activeSource = null;

// sessionStorage cache
var RSS_CACHE_KEY = 'dn-rss-cache';
var RSS_CACHE_TTL = 10 * 60 * 1000; // 10 minutes
var BSKY_CACHE_KEY = 'dn-bsky-cache';
var BSKY_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// ── Cache Helpers ──────────────────────────────────────────

function cacheGet(key, ttl) {
  try {
    var raw = sessionStorage.getItem(key);
    if (!raw) return null;
    var cached = JSON.parse(raw);
    if (Date.now() - cached.ts > ttl) {
      sessionStorage.removeItem(key);
      return null;
    }
    return cached.data;
  } catch (e) {
    return null;
  }
}

function cacheSet(key, data) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ ts: Date.now(), data: data }));
  } catch (e) {
    // storage full or unavailable — silently ignore
  }
}

// ── URL Hash Sync ──────────────────────────────────────────

var hashUpdateInProgress = false;

function updateHash() {
  hashUpdateInProgress = true;
  if (activeSource) {
    window.location.hash = 'source=' + encodeURIComponent(activeSource);
  } else if (activeTopic) {
    window.location.hash = 'topic=' + encodeURIComponent(activeTopic);
  } else if (activeFilter && activeFilter !== 'all') {
    window.location.hash = 'category=' + encodeURIComponent(activeFilter);
  } else {
    // Clear hash without scroll jump
    if (window.location.hash) {
      history.pushState(null, '', window.location.pathname + window.location.search);
    }
  }
  setTimeout(function() { hashUpdateInProgress = false; }, 0);
}

function parseHash() {
  var hash = window.location.hash.replace(/^#/, '');
  if (!hash) return { type: 'none', value: '' };
  var parts = hash.split('=');
  if (parts.length !== 2) return { type: 'none', value: '' };
  var key = parts[0];
  var value = decodeURIComponent(parts[1]);
  if (key === 'category' || key === 'source' || key === 'topic') {
    return { type: key, value: value };
  }
  return { type: 'none', value: '' };
}

function applyHash() {
  var parsed = parseHash();
  if (parsed.type === 'source') {
    applySourceFilter(parsed.value, true);
  } else if (parsed.type === 'topic') {
    applyTopicFilter(parsed.value, true);
  } else if (parsed.type === 'category') {
    applyCategoryFilter(parsed.value, true);
  } else {
    clearAllFilters(true);
  }
}

// ── Filter Management ──────────────────────────────────────

function clearAllFilters(skipHash) {
  activeFilter = 'all';
  activeSource = null;
  activeTopic = null;
  document.querySelectorAll('.filter-btn').forEach(function(b) {
    var isAll = b.getAttribute('data-filter') === 'all';
    b.classList.toggle('active', isAll);
    b.setAttribute('aria-pressed', isAll ? 'true' : 'false');
  });
  hideSourceIndicator();
  visibleCount = 0;
  if (allItems.length > 0) renderItems();
  if (!skipHash) updateHash();
}

function applyCategoryFilter(category, skipHash) {
  activeSource = null;
  activeTopic = null;
  hideSourceIndicator();
  var matched = false;
  document.querySelectorAll('.filter-btn').forEach(function(b) {
    var filter = b.getAttribute('data-filter');
    var isMatch = filter === category;
    b.classList.toggle('active', isMatch);
    b.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
    if (isMatch) matched = true;
  });
  // Also deactivate topic buttons
  document.querySelectorAll('.filter-btn[data-topic]').forEach(function(b) {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  if (!matched) {
    clearAllFilters(skipHash);
    return;
  }
  activeFilter = category;
  visibleCount = 0;
  if (allItems.length > 0) renderItems();
  if (!skipHash) updateHash();
}

function applyTopicFilter(topic, skipHash) {
  if (!TOPICS[topic]) {
    clearAllFilters(skipHash);
    return;
  }
  activeFilter = 'all';
  activeSource = null;
  activeTopic = topic;
  hideSourceIndicator();
  // Deactivate all buttons first
  document.querySelectorAll('.filter-btn').forEach(function(b) {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  // Activate the matching topic button
  document.querySelectorAll('.filter-btn[data-topic]').forEach(function(b) {
    if (b.getAttribute('data-topic') === topic) {
      b.classList.add('active');
      b.setAttribute('aria-pressed', 'true');
    }
  });
  visibleCount = 0;
  if (allItems.length > 0) renderItems();
  if (!skipHash) updateHash();
}

function applySourceFilter(sourceName, skipHash) {
  var validSource = FEEDS.some(function(f) { return f.source === sourceName; });
  if (!validSource) {
    clearAllFilters(skipHash);
    return;
  }
  activeFilter = 'all';
  activeTopic = null;
  activeSource = sourceName;
  // Deactivate all filter buttons
  document.querySelectorAll('.filter-btn').forEach(function(b) {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  showSourceIndicator(sourceName);
  visibleCount = 0;
  if (allItems.length > 0) renderItems();
  if (!skipHash) updateHash();
}

function showSourceIndicator(sourceName) {
  hideSourceIndicator();
  var bar = document.querySelector('.filter-inner');
  if (!bar) return;
  var indicator = document.createElement('span');
  indicator.className = 'source-filter-active';
  indicator.id = 'sourceFilterIndicator';
  indicator.setAttribute('role', 'status');
  indicator.innerHTML = '<strong>' + escapeHtml(sourceName) + '</strong> <button class="source-filter-clear" aria-label="Clear source filter" title="Clear filter">&times;</button>';
  indicator.querySelector('.source-filter-clear').addEventListener('click', function() {
    clearAllFilters(false);
  });
  bar.appendChild(indicator);
}

function hideSourceIndicator() {
  var existing = document.getElementById('sourceFilterIndicator');
  if (existing) existing.parentNode.removeChild(existing);
}

// ── RSS Feed Loading ───────────────────────────────────────

function loadAllFeeds() {
  var container = document.getElementById('newsFeed');
  var loading = document.getElementById('newsLoading');

  // Check sessionStorage cache first
  var cached = cacheGet(RSS_CACHE_KEY, RSS_CACHE_TTL);
  if (cached) {
    allItems = cached.map(function(item) {
      item.pubDate = new Date(item.pubDate);
      return item;
    });
    if (loading) loading.style.display = 'none';
    if (allItems.length === 0) {
      container.innerHTML = '<div class="news-error"><p>No news articles available right now.</p><p>Visit our sources directly:</p>' + buildSourceLinks() + '</div>';
      return;
    }
    updateFilterCounts();
    applyHash();
    return;
  }

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

    // Cache for subsequent page views this session
    cacheSet(RSS_CACHE_KEY, allItems);

    if (loading) loading.style.display = 'none';

    if (allItems.length === 0) {
      container.innerHTML = '<div class="news-error"><p>No news articles available right now.</p><p>Visit our sources directly:</p>' + buildSourceLinks() + '</div>';
      return;
    }

    updateFilterCounts();
    applyHash();
  });
}

// ── Rendering ──────────────────────────────────────────────

function renderItems() {
  var container = document.getElementById('newsFeed');
  var filtered;

  if (activeSource) {
    filtered = allItems.filter(function(item) {
      return item.source === activeSource;
    });
  } else if (activeTopic) {
    filtered = allItems.filter(function(item) {
      return matchTopic(item, activeTopic);
    });
  } else if (activeFilter === 'all') {
    filtered = allItems;
  } else {
    filtered = allItems.filter(function(item) {
      return item.category === activeFilter;
    });
  }

  var frag = document.createDocumentFragment();

  // Insert plan callout at top when topic filter is active (first page only)
  if (visibleCount === 0 && activeTopic) {
    var callout = buildPlanCallout(activeTopic);
    if (callout) frag.appendChild(callout);
  }

  var end = Math.min(visibleCount + ITEMS_PER_PAGE, filtered.length);

  for (var i = visibleCount; i < end; i++) {
    frag.appendChild(buildNewsCard(filtered[i]));
  }

  if (visibleCount === 0) container.innerHTML = '';
  container.appendChild(frag);
  visibleCount = end;

  // Empty state
  if (filtered.length === 0 && visibleCount === 0) {
    container.innerHTML = '<div class="news-error"><p>No articles matching this filter right now. Try a different filter.</p></div>';
  }

  var loadMore = document.getElementById('loadMoreBtn');
  if (loadMore) {
    loadMore.style.display = visibleCount >= filtered.length ? 'none' : 'inline-block';
  }

  updateTopicSignup();
}

function buildNewsCard(item) {
  var article = document.createElement('article');
  article.className = 'news-card reveal visible';
  article.setAttribute('data-category', item.category);

  var timeAgo = relativeTime(item.pubDate);
  var excerpt = item.description;
  if (excerpt.length >= 195) excerpt = excerpt.slice(0, excerpt.lastIndexOf(' ', 195)) + '...';

  // Find matching topics for this article
  var topicTags = '';
  var topicKeys = Object.keys(TOPICS);
  for (var t = 0; t < topicKeys.length; t++) {
    if (matchTopic(item, topicKeys[t])) {
      topicTags += '<span class="news-topic-tag">' + topicKeys[t] + '</span>';
    }
  }

  article.innerHTML =
    '<div class="news-card-body">' +
      '<div class="news-card-meta">' +
        '<button class="news-source-badge" style="background:' + item.color + '" data-source="' + escapeAttr(item.source) + '" title="Filter by ' + escapeAttr(item.source) + '">' + item.source + '</button>' +
        '<span class="news-category-tag">' + item.category + '</span>' +
        topicTags +
        '<span class="news-time">' + timeAgo + '</span>' +
      '</div>' +
      '<h3 class="news-card-title"><a href="' + escapeAttr(item.link) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(item.title) + '</a></h3>' +
      (excerpt ? '<p class="news-card-excerpt">' + escapeHtml(excerpt) + '</p>' : '') +
    '</div>' +
    (item.thumbnail ? '<div class="news-card-thumb"><img src="' + escapeAttr(item.thumbnail) + '" alt="" loading="lazy"></div>' : '');

  return article;
}

function buildPlanCallout(topic) {
  var data = PLAN_CALLOUTS[topic];
  if (!data) return null;
  var div = document.createElement('div');
  div.className = 'plan-callout';
  div.setAttribute('role', 'complementary');
  div.setAttribute('aria-label', data.title);
  div.innerHTML =
    '<p class="plan-callout-label">Cortney\'s Plan</p>' +
    '<h3 class="plan-callout-title">' + escapeHtml(data.title) + '</h3>' +
    '<p class="plan-callout-text">' + escapeHtml(data.text) + '</p>' +
    '<a href="' + escapeAttr(data.link) + '" class="plan-callout-link">Read the Platform &rarr;</a>';
  return div;
}

function updateTopicSignup() {
  var heading = document.getElementById('topicSignupHeading');
  var sub = document.getElementById('topicSignupSub');
  var field = document.getElementById('topicSignupField');
  if (!heading || !sub || !field) return;

  var label = null;
  var fieldValue = 'general';

  if (activeTopic) {
    label = activeTopic;
    fieldValue = activeTopic;
  } else if (activeSource) {
    label = activeSource;
    fieldValue = 'source-' + activeSource;
  } else if (activeFilter && activeFilter !== 'all') {
    label = activeFilter;
    fieldValue = 'category-' + activeFilter;
  }

  if (label) {
    heading.innerHTML = 'Want <span class="topic-signup-topic">' + escapeHtml(label) + '</span> updates from OH-11?';
    sub.textContent = 'Get weekly alerts for ' + label + ' news in your district.';
    field.value = fieldValue;
  } else {
    heading.textContent = 'Want district news in your inbox?';
    sub.textContent = 'Sign up for updates from OH-11.';
    field.value = 'general';
  }
}

// ── Topic Matching ─────────────────────────────────────────

function matchTopic(item, topic) {
  var text = (item.title + ' ' + item.description).toLowerCase();
  var keywords = TOPICS[topic];
  for (var i = 0; i < keywords.length; i++) {
    if (text.indexOf(keywords[i]) !== -1) return true;
  }
  return false;
}

// ── Bluesky Feed ───────────────────────────────────────────

function loadBlueskyFeed() {
  var container = document.getElementById('bskyFeed');
  if (!container) return;

  // Check cache first
  var cached = cacheGet(BSKY_CACHE_KEY, BSKY_CACHE_TTL);
  if (cached) {
    container.innerHTML = cached;
    return;
  }

  fetch(BSKY_API + '?actor=' + BSKY_HANDLE + '&limit=6&filter=posts_no_replies')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (!data.feed || data.feed.length === 0) {
        container.innerHTML = '<p class="bsky-empty">Follow Cortney on <a href="https://bsky.app/profile/' + BSKY_HANDLE + '" target="_blank" rel="noopener noreferrer">Bluesky</a> for updates.</p>';
        return;
      }

      var html = '';
      data.feed.forEach(function(item) {
        var post = item.post;
        var record = post.record || {};
        var author = post.author || {};
        var time = relativeTime(new Date(record.createdAt));
        var text = escapeHtml(record.text || '');
        text = text.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">link</a>');

        var rkey = post.uri ? post.uri.split('/').pop() : '';
        var postUrl = 'https://bsky.app/profile/' + (author.handle || BSKY_HANDLE) + '/post/' + rkey;

        var imageHtml = '';
        if (post.embed && post.embed.images && post.embed.images.length > 0) {
          imageHtml = '<img class="bsky-image" src="' + escapeAttr(post.embed.images[0].thumb) + '" alt="' + escapeAttr(post.embed.images[0].alt || '') + '" loading="lazy">';
        }

        html += '<a class="bsky-post" href="' + escapeAttr(postUrl) + '" target="_blank" rel="noopener noreferrer">' +
          '<div class="bsky-post-header">' +
            (author.avatar ? '<img class="bsky-avatar" src="' + escapeAttr(author.avatar) + '" alt="" width="32" height="32">' : '') +
            '<div class="bsky-post-author">' +
              '<span class="bsky-author">' + escapeHtml(author.displayName || BSKY_HANDLE) + '</span>' +
              '<span class="bsky-time">' + time + '</span>' +
            '</div>' +
          '</div>' +
          '<p class="bsky-text">' + text + '</p>' +
          imageHtml +
          '<div class="bsky-stats">' +
            '<span title="Likes">&#9825; ' + (post.likeCount || 0) + '</span>' +
            '<span title="Reposts">&#8635; ' + (post.repostCount || 0) + '</span>' +
            '<span title="Replies">&#9993; ' + (post.replyCount || 0) + '</span>' +
          '</div>' +
        '</a>';
      });
      container.innerHTML = html;
      cacheSet(BSKY_CACHE_KEY, html);
    })
    .catch(function() {
      container.innerHTML = '<p class="bsky-empty">Follow Cortney on <a href="https://bsky.app/profile/' + BSKY_HANDLE + '" target="_blank" rel="noopener noreferrer">Bluesky</a> for updates.</p>';
    });
}

// ── Utilities ──────────────────────────────────────────────

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
    { name: 'News 5', url: 'https://www.news5cleveland.com/news/local-news' },
    { name: 'Signal Cleveland', url: 'https://signalcleveland.org/' },
    { name: 'The Land', url: 'https://thelandcle.org/' },
    { name: 'Ideastream', url: 'https://www.ideastream.org/' },
    { name: 'Call & Post', url: 'https://callandpost.com/' },
    { name: 'Eye on Ohio', url: 'https://eyeonohio.com/' },
    { name: 'Cleveland Scene', url: 'https://www.clevescene.com/' }
  ];
  return '<div class="news-source-links">' + links.map(function(l) {
    return '<a href="' + l.url + '" target="_blank" rel="noopener noreferrer">' + l.name + '</a>';
  }).join('') + '</div>';
}

// ── Filter Counts ──────────────────────────────────────────

function updateFilterCounts() {
  var counts = { all: allItems.length };
  allItems.forEach(function(item) {
    counts[item.category] = (counts[item.category] || 0) + 1;
  });
  var topicKeys = Object.keys(TOPICS);
  for (var t = 0; t < topicKeys.length; t++) {
    var topic = topicKeys[t];
    var topicCount = 0;
    for (var i = 0; i < allItems.length; i++) {
      if (matchTopic(allItems[i], topic)) topicCount++;
    }
    counts['topic_' + topic] = topicCount;
  }

  document.querySelectorAll('.filter-btn').forEach(function(btn) {
    var filter = btn.getAttribute('data-filter');
    var topic = btn.getAttribute('data-topic');
    var count;
    if (topic) {
      count = counts['topic_' + topic] || 0;
    } else {
      count = filter === 'all' ? counts.all : (counts[filter] || 0);
    }
    var countEl = btn.querySelector('.filter-count');
    if (countEl) countEl.textContent = count;
  });
}

// ── Event Handlers ─────────────────────────────────────────

// Category filter buttons
document.querySelectorAll('.filter-btn[data-filter]').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var filter = btn.getAttribute('data-filter');
    if (filter === 'all') {
      clearAllFilters(false);
    } else {
      applyCategoryFilter(filter, false);
    }
  });
});

// Topic filter buttons
document.querySelectorAll('.filter-btn[data-topic]').forEach(function(btn) {
  btn.addEventListener('click', function() {
    applyTopicFilter(btn.getAttribute('data-topic'), false);
  });
});

// Source badge clicks (event delegation on news feed)
var newsFeedEl = document.getElementById('newsFeed');
if (newsFeedEl) {
  newsFeedEl.addEventListener('click', function(e) {
    var badge = e.target.closest('.news-source-badge');
    if (!badge) return;
    e.preventDefault();
    e.stopPropagation();
    var sourceName = badge.getAttribute('data-source');
    if (!sourceName) return;
    applySourceFilter(sourceName, false);
  });
}

// Load more
var loadMoreBtn = document.getElementById('loadMoreBtn');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', renderItems);
}

// Browser back/forward
window.addEventListener('hashchange', function() {
  if (hashUpdateInProgress) return;
  if (allItems.length > 0) applyHash();
});

// ── Init ───────────────────────────────────────────────────

loadAllFeeds();
loadBlueskyFeed();
