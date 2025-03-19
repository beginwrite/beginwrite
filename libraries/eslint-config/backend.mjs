import eslintConfigBase from './base.mjs';

export default [
  ...eslintConfigBase,
  {
    rules: {
      // "@typescript-eslint/interface-name-prefix": "off",
      // "@typescript-eslint/explicit-function-return-type": "off",
      // "@typescript-eslint/explicit-module-boundary-types": "off",
      // "@typescript-eslint/no-explicit-any": "off",
      // "@typescript-eslint/no-unused-vars": "off",
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
  }
]
