import type { Config } from 'drizzle-kit';

import env from './server/lib/env';

export default {
  schema: './server/db/schema',
  out: './server/db/migrations',
  dialect: 'turso',
  dbCredentials: {
    url: env.TURSO_URL!,
    authToken: env.TURSO_TOKEN!,
  },
} satisfies Config;
