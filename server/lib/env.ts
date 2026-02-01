import { z } from 'zod';

import tryParseEnv from './try-parse-env';

const EnvSchema = z.object({
  NODE_ENV: z.string(),
  TURSO_URL: z.url(),
  TURSO_TOKEN: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  EMAIL_USER: z.string(),
  EMAIL_PASS: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

tryParseEnv(EnvSchema);

// eslint-disable-next-line node/no-process-env
export default EnvSchema.parse(process.env);
