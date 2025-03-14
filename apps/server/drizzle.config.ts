import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';
dotenv.config();

export default defineConfig({
  dialect: 'mysql',
  schema: './db/schema/*',
  out: './db/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
