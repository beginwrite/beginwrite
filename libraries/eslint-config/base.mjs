import tsEslint from 'typescript-eslint';
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import vitest from "@vitest/eslint-plugin";

export default [
  ...eslint.configs.recommended,
  ...tsEslint.configs.recommendedTypeChecked,
  eslintConfigPrettier,
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      ...importPlugin.flatConfigs.recommended,
      ...importPlugin.flatConfigs.typescript,
    ],
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
  },
  {
    files: ["**/*.{js,cjs,mjs,jsx}"],
    ...tsEslint.configs.disableTypeChecked,
    extends: [
      ...importPlugin.flatConfigs.recommended,
    ],
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
]
