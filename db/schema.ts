import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const siteContent = sqliteTable('site_content', { id: text('id').primaryKey(), data: text('data').notNull(), revision: integer('revision').notNull().default(1) });
export const adminOwner = sqliteTable('admin_owner', { id: text('id').primaryKey(), userId: text('user_id').notNull() });
