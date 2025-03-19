import typescriptEslint from "typescript-eslint";
import vitest from "@vitest/eslint-plugin";
import importPlugin from 'eslint-plugin-import';
import prettier from "eslint-plugin-prettier";
import { fixupPluginRules } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";


// TODO: FlatCompat は暫定処理なので、将来的には削除する
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
  ), {
  plugins: {
    "typescript-eslint": typescriptEslint,
    vitest,
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
    ...vitest.configs.recommended.rules,
    "vitest/padding-around-all": "error",
  },
}];
