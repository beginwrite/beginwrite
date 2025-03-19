import eslintConfig from '@beginwrite/eslint-config/backend';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['src/graphql/graphql.ts']),
  ...eslintConfig,
]);
