import db from '~~/server/db';
import { projects, projectUpdateSchema } from '~~/server/db/schema/project-schema';
import cloudinary from '~~/server/lib/cloudinary';
import { eq } from 'drizzle-orm/sql';
import formidable from 'formidable';
import fs from 'node:fs';

// Helper: only include fields which are defined/not nullconst cleanFields = (obj: { [s: string]: unknown } | ArrayLike<unknown>) => Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null));

export default defineEventHandler(async (event) => {
  const form = formidable({
    multiples: false,
    keepExtensions: true,
  });

  const [fields, files] = await form.parse(event.node.req);

  const getField = (f: string | string[] | undefined): string | null =>
    f ? (Array.isArray(f) ? f[0] : f) : null;

  const id = Number(getField(fields.id)); // You must pass the project id to update
  if (!id)
    throw new Error('Project id is required');

  const name = getField(fields.name);
  const description = getField(fields.description);
  const category = getField(fields.category);
  const live_demo = getField(fields.live_demo);
  const github_link = getField(fields.github_link);

  let cloudinaryUrl: string | undefined;
  const file = files.imageFile?.[0];

  if (file) {
    const upload = await cloudinary.uploader.upload(file.filepath, {
      folder: 'my-profile/projects',
      use_filename: true,
      unique_filename: false,
      resource_type: 'image',
    });
    cloudinaryUrl = upload.secure_url;
    fs.unlink(file.filepath, () => {});
  }

  // Only update fields provided (not null/undefined)
  const updateData = ({
    name,
    description,
    category,
    image: cloudinaryUrl,
    live_demo,
    github_link,
  });

  // Validate using your update schema if you have one
  const validData = projectUpdateSchema.parse(updateData);

  // Perform the update
  const updatedProject = await db
    .update(projects)
    .set(validData)
    .where(eq(projects.id, id));

  return { updatedProject, message: 'Project updated successfully' };
});
