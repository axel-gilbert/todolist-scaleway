import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
    id: text('id').primaryKey(),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow()
});

export const session = pgTable("session", {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => user.id),
    expiresAt: timestamp('expires_at').notNull()
});

export const todo = pgTable('todo', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => user.id),
    title: text('title').notNull(),
    description: text('description'),
    completed: boolean('completed').notNull().default(false),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type Todo = typeof todo.$inferSelect;
