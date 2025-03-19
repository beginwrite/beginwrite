import tsEslint from 'typescript-eslint';
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import vitest from "@vitest/eslint-plugin";

export default [
  eslint.configs.recommended,
  ...tsEslint.configs.recommendedTypeChecked,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      tsEslint,
    },
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        sourceType: "module",
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/resolver': {
        typescript: { project: './' }
      },
    },
  },
  importPlugin.flatConfigs.recommended,
  {
    files: ["**/*.{js,cjs,mjs,jsx}"],
    ...tsEslint.configs.disableTypeChecked,
  },
  {
    files: ["**/*.spec.{ts,tsx}"],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      "vitest/prefer-expect-resolves": "error",
      "vitest/padding-around-all": "error",
    },
  },
  eslintConfigPrettier,
]
