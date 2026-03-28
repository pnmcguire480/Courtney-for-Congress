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
