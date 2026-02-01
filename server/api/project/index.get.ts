import db from '~~/server/db';
import { projects } from '~~/server/db/schema/project-schema';

export default defineEventHandler(async () => {
  const allProjects = await db.select().from(projects);
  return allProjects;
});
