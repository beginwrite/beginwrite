import eslintConfig from '@beginwrite/eslint-config/backend';

export default [
  ...eslintConfig,
  {
    ignores: [
      './src/graphql/graphql.ts',
    ],
  },
  {
    rules: {
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "import/named": "off",
      "import/no-unresolved": "off",
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
    }
  }
];
