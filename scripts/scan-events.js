#!/usr/bin/env node

// Event Scanner — reads OH-11 RSS feeds, extracts events, adds to events.json
// Runs via GitHub Action on schedule or manually

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const EVENTS_FILE = path.join(__dirname, '..', 'src', '_data', 'events.json');
const RSS_PROXY = 'https://api.rss2json.com/v1/api.json?rss_url=';

const FEEDS = [
  'https://www.clevescene.com/feed/?partner-feed=news-views',
  'https://signalcleveland.org/feed/',
  'https://ohiocapitaljournal.com/feed/',
  'https://www.news5cleveland.com/index.rss'
];

// Keywords that suggest an event (not just coverage of a past event)
const EVENT_KEYWORDS = [
  'rally', 'march', 'protest', 'town hall', 'town-hall', 'community meeting',
  'food distribution', 'food drive', 'canvass', 'phone bank', 'fundraiser',
  'voter registration', 'petition', 'signature', 'demonstration', 'vigil',
  'forum', 'panel', 'workshop', 'block party', 'neighborhood meeting',
  'labor rally', 'union meeting', 'strike', 'walkout', 'sit-in'
];

// OH-11 location keywords
const LOCATION_KEYWORDS = [
  'cleveland', 'akron', 'parma', 'lakewood', 'euclid', 'shaker heights',
  'cleveland heights', 'east cleveland', 'garfield heights', 'maple heights',
  'warrensville', 'bedford', 'solon', 'twinsburg', 'cuyahoga',
  'summit county', 'public square', 'free stamp', 'ohio'
];

// Words suggesting the article is about a FUTURE event, not past coverage
const FUTURE_SIGNALS = [
  'upcoming', 'join us', 'this saturday', 'this sunday', 'this week',
  'next week', 'will be held', 'is scheduled', 'are invited', 'rsvp',
  'register now', 'sign up', 'doors open', 'starts at', 'begins at',
  'come out', 'show up', 'don\'t miss', 'mark your calendar',
  'happening', 'planned for', 'set for'
];

function fetch(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { headers: { 'User-Agent': 'CortForCongress-EventScanner/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function matchesKeywords(text, keywords) {
  const lower = text.toLowerCase();
  return keywords.filter(kw => lower.includes(kw));
}

function extractDate(text) {
  // Try to find dates like "April 5", "March 28, 2026", "4/5/2026", etc.
  const patterns = [
    /(\w+ \d{1,2},?\s*2026)/i,
    /(\d{1,2}\/\d{1,2}\/2026)/,
    /(january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2}/i
  ];

  for (const pat of patterns) {
    const match = text.match(pat);
    if (match) {
      const d = new Date(match[1] + (match[1].includes('2026') ? '' : ', 2026'));
      if (!isNaN(d.getTime())) {
        return d.toISOString().split('T')[0];
      }
    }
  }
  return null;
}

function guessEventType(text) {
  const lower = text.toLowerCase();
  if (lower.match(/rally|march|protest|demonstration|vigil/)) return 'rally';
  if (lower.match(/town hall|forum|panel|meeting/)) return 'town-hall';
  if (lower.match(/canvass|door.?knock|petition|signature/)) return 'canvass';
  if (lower.match(/phone bank/)) return 'phone-bank';
  if (lower.match(/fundrais|donate/)) return 'fundraiser';
  return 'community';
}

async function scanFeed(feedUrl) {
  const candidates = [];

  try {
    const proxyUrl = RSS_PROXY + encodeURIComponent(feedUrl);
    const raw = await fetch(proxyUrl);
    const data = JSON.parse(raw);

    if (!data.items) return candidates;

    for (const item of data.items) {
      const fullText = (item.title || '') + ' ' + (item.description || '') + ' ' + (item.content || '');

      // Must mention OH-11 area
      const locationHits = matchesKeywords(fullText, LOCATION_KEYWORDS);
      if (locationHits.length === 0) continue;

      // Must have event-like keywords
      const eventHits = matchesKeywords(fullText, EVENT_KEYWORDS);
      if (eventHits.length === 0) continue;

      // Should suggest a future event, not just past coverage
      const futureHits = matchesKeywords(fullText, FUTURE_SIGNALS);
      if (futureHits.length === 0) continue;

      // Try to extract a date
      const date = extractDate(fullText);
      if (!date) continue;

      // Skip if date is in the past
      if (new Date(date + 'T23:59:59') < new Date()) continue;

      candidates.push({
        title: (item.title || 'Untitled Event').replace(/<[^>]+>/g, '').trim(),
        date: date,
        startTime: '12:00',
        endTime: '14:00',
        type: guessEventType(fullText),
        location: locationHits[0].charAt(0).toUpperCase() + locationHits[0].slice(1) + ', OH',
        description: (item.description || '').replace(/<[^>]+>/g, '').substring(0, 200).trim(),
        descriptionEs: '',
        link: '/get-involved.html',
        _source: feedUrl,
        _sourceUrl: item.link || '',
        _auto: true
      });
    }
  } catch (err) {
    console.error('Error scanning ' + feedUrl + ':', err.message);
  }

  return candidates;
}

async function main() {
  console.log('Scanning OH-11 RSS feeds for events...\n');

  // Load existing events
  const existing = JSON.parse(fs.readFileSync(EVENTS_FILE, 'utf8'));
  const existingTitles = new Set(existing.map(e => e.title.toLowerCase()));

  let newEvents = [];

  for (const feed of FEEDS) {
    console.log('Scanning: ' + feed);
    const candidates = await scanFeed(feed);
    console.log('  Found ' + candidates.length + ' candidate(s)');

    for (const c of candidates) {
      // Skip duplicates
      if (existingTitles.has(c.title.toLowerCase())) {
        console.log('  Skipping duplicate: ' + c.title);
        continue;
      }
      existingTitles.add(c.title.toLowerCase());
      newEvents.push(c);
    }
  }

  if (newEvents.length === 0) {
    console.log('\nNo new events found.');
    return;
  }

  console.log('\n' + newEvents.length + ' new event(s) discovered:');
  newEvents.forEach(e => console.log('  - ' + e.date + ': ' + e.title));

  // Add to events array (after existing, before sort)
  const merged = [...existing, ...newEvents];

  // Sort by date descending (newest first)
  merged.sort((a, b) => b.date.localeCompare(a.date));

  fs.writeFileSync(EVENTS_FILE, JSON.stringify(merged, null, 2) + '\n');
  console.log('\nUpdated ' + EVENTS_FILE);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
