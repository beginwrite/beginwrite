import typescriptEslint from "@typescript-eslint/eslint-plugin";
import jest from "eslint-plugin-jest";
import importPlugin from 'eslint-plugin-import';
import prettier from "eslint-plugin-prettier";
import { fixupPluginRules } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
    import: fixupPluginRules(importPlugin),
});

export default [
  ...compat.extends(
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:jest/recommended",
  ), {
  plugins: {
    "@typescript-eslint": typescriptEslint,
    jest,
    prettier,
  },

  rules: {
    "react/display-name": "off",
    "@typescript-eslint/no-unused-vars": "off",

    "import/order": ["warn", {
      groups: [
        "builtin",
        "external",
        "internal",
        "parent",
        "sibling",
        "index",
        "object",
        "type",
      ],

      "newlines-between": "always",
      pathGroupsExcludedImportTypes: ["builtin"],

      alphabetize: {
        order: "asc",
        caseInsensitive: true,
      },
    }],

    "jest/padding-around-all": "error",
  },
    ignores: ['jest.polyfills.js'],
}];
