import eslintConfigBase from "./base.mjs";
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  ...eslintConfigBase,
  ...react.configs.flat.recommended,
  {
    ignores: ['.next', '.turbo', 'storybook-static'],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'no-console': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    files: ['**/*.stories.tsx'],
    rules: {
      'no-console': 'off',
      'react-hooks/rules-of-hooks': 'off',
    },
  }
];
