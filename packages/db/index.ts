import { createClient } from '@libsql/client'
import env from '@wes/env'
import { drizzle } from 'drizzle-orm/libsql'
import { importTable } from './schema/import'
import { linkTable } from './schema/link'

const client = createClient({
  url: env.DB_URL,
  authToken: env.DB_AUTH_TOKEN,
})

export const db = drizzle(client, {
  schema: {
    importTable,
    linkTable,
  },
})

export * from './schema/import'
export * from './schema/link'
