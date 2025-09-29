import { z } from 'zod';

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
});

export { loginSchema };
export type Login = z.infer<typeof loginSchema>;
