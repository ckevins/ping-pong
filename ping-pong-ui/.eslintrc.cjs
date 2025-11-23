/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
  ],
  overrides: [
    {
      files: ["cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}"],
      extends: ["plugin:cypress/recommended"],
    },
    // TypeScript files (including <script lang="ts"> in .vue)
    {
      files: ["**/*.{ts,tsx,vue}"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        extraFileExtensions: [".vue"],
      },
      plugins: ["@typescript-eslint"],
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        // Optional: if you prefer `type` instead of `interface` you can enforce it:
        // "@typescript-eslint/consistent-type-definitions": ["error", "type"]
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
};
