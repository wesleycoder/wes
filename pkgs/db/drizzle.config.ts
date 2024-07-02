import env from '@wes/env'
import type { Config } from 'drizzle-kit'

export default {
  schema: './index.ts',
  out: './migrations',
  driver: 'turso',
  dialect: 'sqlite',
  dbCredentials: {
    url: env.DB_FILE_URL ?? env.DB_URL,
    authToken: env.DB_AUTH_TOKEN,
  },
} satisfies Config
