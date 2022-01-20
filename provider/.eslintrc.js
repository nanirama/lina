module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: ["next"],
  rules: {
    "react/prop-types": "off",
    "react/display-name": "off",
    "no-return-await": "off",
    "prettier/prettier": "warn",
  },
};
