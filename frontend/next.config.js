const withTM = require("next-transpile-modules")([
  "@healthgent/server",
  "@healthgent/common",
]);
module.exports = withTM({
  webpack5: true,
	env: {
	  NEXT_PUBLIC_HG_BASE_API_URL: process.env.NEXT_PUBLIC_HG_BASE_API_URL,
	},
});
