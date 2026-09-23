const { dateToRfc822 } = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");

  // RFC-822 date filter
  eleventyConfig.addFilter("dateToRfc822", dateToRfc822);

  // Current year
  eleventyConfig.addShortcode("year", () => {
    return new Date().getFullYear();
  });

  // Blog posts
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/blog/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // Date filter
  eleventyConfig.addFilter("date", function (date) {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  });

  // Find member by ID
  eleventyConfig.addFilter("findById", function (items, id) {
    if (!items || !id) {
      return null;
    }

    return items.find((item) => item.id === id) || null;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },

    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
