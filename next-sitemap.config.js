/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://mikemachage.tech',
    generateRobotsTxt: true, // Generates a robots.txt file
    sitemapSize: 7000, // Number of URLs per sitemap file
};