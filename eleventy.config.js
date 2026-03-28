module.exports = function(eleventyConfig) {

  // ===== PASSTHROUGH COPY =====
  // Assets stay exactly as-is — no processing
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // ===== COLLECTIONS =====
  // Blog posts sorted newest-first
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/news/*.md").sort(function(a, b) {
      return b.date - a.date;
    });
  });

  // ===== FILTERS =====
  // Strip HTML tags (for RSS feed titles)
  eleventyConfig.addFilter("stripHtml", function(str) {
    return str ? str.replace(/<[^>]+>/g, '') : '';
  });

  // Format date as "March 8, 2026"
  eleventyConfig.addFilter("readableDate", function(dateObj) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(dateObj);
  });

  // Format date as "MAR 8, 2026" (for post cards)
  eleventyConfig.addFilter("shortDate", function(dateObj) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(dateObj).toUpperCase();
  });

  // Format date as "YYYY-MM-DD" (for LD+JSON and sitemap)
  eleventyConfig.addFilter("isoDate", function(dateObj) {
    if (!dateObj || dateObj === '') return new Date().toISOString().split('T')[0];
    return dateObj.toISOString().split('T')[0];
  });

  // Format number with commas (e.g., 2200 → "2,200")
  eleventyConfig.addFilter("toLocaleString", function(num) {
    return Number(num).toLocaleString('en-US');
  });

  // Compute signature percentage
  eleventyConfig.addFilter("sigPercent", function(count, goal) {
    return Math.round((count / goal) * 100);
  });

  // Date helpers for event auto-expire
  eleventyConfig.addFilter("isFuture", function(dateStr) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(dateStr + 'T23:59:59') >= today;
  });

  eleventyConfig.addFilter("isPast", function(dateStr) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(dateStr + 'T23:59:59') < today;
  });

  // Format event date string "2026-03-28" to parts
  eleventyConfig.addFilter("eventMonth", function(dateStr) {
    return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { month: 'short' });
  });

  eleventyConfig.addFilter("eventDay", function(dateStr) {
    return new Date(dateStr + 'T12:00:00').getDate();
  });

  eleventyConfig.addFilter("eventDow", function(dateStr) {
    return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short' });
  });

  eleventyConfig.addFilter("eventReadable", function(dateStr) {
    return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  });

  // Format "13:00" to "1:00 PM"
  eleventyConfig.addFilter("formatTime", function(timeStr) {
    var parts = timeStr.split(':');
    var h = parseInt(parts[0]);
    var m = parts[1];
    var ampm = h >= 12 ? 'PM' : 'AM';
    h = h > 12 ? h - 12 : (h === 0 ? 12 : h);
    return h + ':' + m + ' ' + ampm;
  });

  // Format "20260328T130000" for .ics from date + time
  eleventyConfig.addFilter("icsDateTime", function(dateStr, timeStr) {
    return dateStr.replace(/-/g, '') + 'T' + timeStr.replace(':', '') + '00';
  });

  // Spanish event type labels
  eleventyConfig.addFilter("eventTypeEs", function(type) {
    var map = {
      'rally': 'Manifestación',
      'community': 'Comunitario',
      'town-hall': 'Asamblea',
      'canvass': 'Recorrido',
      'phone-bank': 'Banco Telefónico',
      'fundraiser': 'Recaudación'
    };
    return map[type] || type;
  });

  // Spanish day of week
  eleventyConfig.addFilter("eventDowEs", function(dateStr) {
    var days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    return days[new Date(dateStr + 'T12:00:00').getDay()];
  });

  // ===== SHORTCODES =====
  // CSS version string for cache busting
  eleventyConfig.addShortcode("cssVersion", function() {
    return "20260322";
  });

  // ===== CONFIG =====
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
