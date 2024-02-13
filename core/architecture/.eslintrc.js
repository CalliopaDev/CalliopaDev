/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    extends: ["@calliopadev/eslint-config/api-style.js"],
    parserOptions: {
      project: "./tsconfig.json",
    },
  };
