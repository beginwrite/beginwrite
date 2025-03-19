import { mysqlTable, text, int, varchar } from 'drizzle-orm/mysql-core';

import { users } from './users';

export const posts = mysqlTable('post', {
  id: int().autoincrement().primaryKey(),
  uuid: varchar({ length: 1024 }).notNull(),
  title: varchar({ length: 255 }).notNull(),
  content: text().notNull(),
  user: int('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  published_at: varchar({ length: 255 }),
  created_at: varchar({ length: 255 }).notNull(),
  updated_at: varchar({ length: 255 }),
  deleted_at: varchar({ length: 255 }),
});
