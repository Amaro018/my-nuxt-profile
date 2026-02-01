import db from '~~/server/db';
import { projects } from '~~/server/db/schema/project-schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const idString = query.id;
  if (!idString) {
    return { statusCode: 400, message: 'Missing id' };
  }
  const id = Number(idString);
  if (Number.isNaN(id)) {
    return { statusCode: 400, message: 'Invalid id' };
  }
  await db.delete(projects).where(eq(projects.id, id));
  return { message: 'Project deleted successfully' };
});
