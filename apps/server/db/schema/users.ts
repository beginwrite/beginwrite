import { mysqlTable, text, int, varchar } from 'drizzle-orm/mysql-core';

import { posts } from './posts';

export const users = mysqlTable('user', {
  id: int().autoincrement().primaryKey(),
  uuid: varchar({ length: 1024 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  hash: varchar({ length: 255 }).notNull(),
  access_token: varchar({ length: 1024 }),
  display_name: varchar({ length: 255 }).notNull(),
  bio: text(),
  avatar: varchar({ length: 1000 }),
  created_at: varchar({ length: 255 }).notNull(),
  updated_at: varchar({ length: 255 }).notNull(),
  posts: int('post_id').references(() => posts.id, { onDelete: 'cascade' }),
});
