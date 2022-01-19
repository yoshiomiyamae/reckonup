/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "en",
  },
  images: {
    domains: ["www.gravatar.com"],
  },
};
