import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import z from 'zod';

const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  image: text('image').notNull(),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
  live_demo: text('live_demo'),
  github_link: text('github_link'),
});

const projectInsertSchema = createInsertSchema(projects, {
  name: schema => schema.min(3),
  category: schema => schema.min(3),
  description: schema => schema.min(3),
  image: schema => schema.min(3),
  live_demo: schema => schema.nullable(),
  github_link: schema => schema.nullable(),
}).omit({
  id: true,
  createdAt: true,
});

const projectSelectSchema = createSelectSchema(projects);

const projectUpdateSchema = createUpdateSchema(projects)
  .omit({ createdAt: true, id: true })
  .partial();

export { projectInsertSchema, projects, projectSelectSchema, projectUpdateSchema };
