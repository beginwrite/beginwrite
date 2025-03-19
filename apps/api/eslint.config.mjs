import typescriptEslint from "typescript-eslint";
import _import from "eslint-plugin-import";
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
  allConfig: js.configs.all
});

export default [{
  ignores: ["**/.eslintrc.js", "./graphql.ts"],
}, ...compat.extends(
  "plugin:@typescript-eslint/recommended",
  "plugin:prettier/recommended",
  "prettier",
), {
  plugins: {
    "typescript-eslint": typescriptEslint,
    import: fixupPluginRules(_import),
  },

  languageOptions: {
    parser: typescriptEslint.parser,
    ecmaVersion: 5,
    sourceType: "module",

    parserOptions: {
      project: "tsconfig.json",
      tsconfigRootDir: __dirname,
    },
  },

  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",

    "import/order": ["error", {
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
  },
}];
