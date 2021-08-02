module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["de", "fr", "en", "catchAll"],
    defaultLocale: "catchAll",
  },
  async redirects() {
    return [
      {
        source: "/catchAll",
        destination: "/en",
        locale: false,
        permanent: false,
      },
      {
        source: "/catchAll/:slug*",
        destination: "/en/:slug*",
        locale: false,
        permanent: false,
      },
    ];
  },
  images: {
    domains: ["api.the-bath-shop.com"],
  },
};
