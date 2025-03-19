import eslintConfig from '@beginwrite/eslint-config/frontend';

export default [
  ...eslintConfig,
  {
    ignores: [
      '**/public',
       // HACK: mock の 定義が不十分であるため、一旦無視する
       // TODO: msw/data を使い、Factory ベースで定義する
      "**/mocks",
    ],
  },
  {
    rules: {
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
      '@typescript-eslint/no-unused-vars': 'off',
    }
  }
];
