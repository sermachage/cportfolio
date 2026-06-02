/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://mikemachage.vercel.app',
    generateRobotsTxt: true, // Generates a robots.txt file
    sitemapSize: 7000, // Number of URLs per sitemap file
    changefreq: 'weekly', // Change frequency for all URLs
    priority: 0.7, // Priority for all URLs
};