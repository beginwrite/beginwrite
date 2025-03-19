import eslintConfigBase from './base.mjs';

export default [
  ...eslintConfigBase,
  {
    rules: {
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
    }
  }
]
