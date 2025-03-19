import eslintConfigBase from "./base.mjs";
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  ...eslintConfigBase,
  react.configs.flat.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    ignores: ['.next', '.turbo', 'storybook-static'],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    settings: {
      'import/resolver': {
        typescript: { project: './' }
      },
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'import/named': 'off',
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
