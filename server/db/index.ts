import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

import env from '../lib/env';

const client = createClient({
  url: env.TURSO_URL,
  authToken: env.TURSO_TOKEN,
});

export const db = drizzle(client);

export default db;
