import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import z from 'zod';

const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  profile_image: text('profile_image'),
  role: text('role'),
  // SQLite uses CURRENT_TIMESTAMP for default date/time
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
});

const userInsertSchema = createInsertSchema(users, {
  name: schema => schema.min(3),
  email: schema => schema.min(3),
  password: schema => schema.min(8, { message: 'minimum of 8 chars' }),
}).omit({
  id: true,
  createdAt: true,
  profile_image: true,
  role: true,
});

const userSelectSchema = createSelectSchema(users).omit({ password: true });

const userUpdateSchema = createUpdateSchema(users)
  .omit({ createdAt: true, id: true, role: true, password: true })
  .extend({
    old_password: z.string().optional(),
    new_password: z.string().optional(),
  });

export { userInsertSchema, users, userSelectSchema, userUpdateSchema };
