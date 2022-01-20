const withTM = require("next-transpile-modules")([
  "@healthgent/server",
  "@healthgent/common",
]);

module.exports = withTM({
  async redirects() {
    return [
      {
        source: "/",
        destination: "/appointments",
        permanent: true,
      },
    ];
  },

  webpack5: true,
  env: {
    NEXT_PUBLIC_HG_BASE_API_URL: process.env.NEXT_PUBLIC_HG_BASE_API_URL
  }
});
