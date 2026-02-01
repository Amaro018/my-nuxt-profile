import db from '~~/server/db';
import { projectInsertSchema, projects } from '~~/server/db/schema/project-schema';
import cloudinary from '~~/server/lib/cloudinary';
import formidable from 'formidable';
import fs from 'node:fs';
import { join } from 'node:path';

export default defineEventHandler(async (event) => {
  const form = formidable({
    multiples: false,
    keepExtensions: true, // keep original extension
  });

  const [fields, files] = await form.parse(event.node.req);

  const getField = (f: string | string[] | undefined): string | null =>
    f ? (Array.isArray(f) ? f[0] : f) : null;

  const name = getField(fields.name);
  const description = getField(fields.description);
  const category = getField(fields.category);
  const live_demo = getField(fields.live_demo);
  const github_link = getField(fields.github_link);
  let cloudinaryUrl: string | null = null;
  const file = files.imageFile?.[0];

  if (file) {
    const upload = await cloudinary.uploader.upload(file.filepath, {
      folder: 'my-profile/projects', // optional folder in Cloudinary
      use_filename: true,
      unique_filename: false,
      resource_type: 'image',
    });
    cloudinaryUrl = upload.secure_url;

    // (Optional) Clean up temp file
    fs.unlink(file.filepath, () => {});
  }

  const projectData = projectInsertSchema.parse({
    name,
    description,
    category,
    image: cloudinaryUrl,
    live_demo,
    github_link,
  });

  const createdProject = await db.insert(projects).values(projectData);

  return { createdProject, message: 'Project created successfully' };
});
