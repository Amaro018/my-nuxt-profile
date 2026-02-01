import { z } from 'zod';
import { id } from 'zod/v4/locales';

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
});

const ProjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
  live_demo: z.string().nullable(),
  github_link: z.string().nullable(),
});

export { loginSchema };
export type Login = z.infer<typeof loginSchema>;

export { ProjectSchema };
export type Project = z.infer<typeof ProjectSchema>;
