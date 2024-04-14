import { createClient } from '@libsql/client'
import '@wes/env'
import { drizzle } from 'drizzle-orm/libsql'
import process from 'node:process'
import { importTable } from './schema/import'

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

export const db = drizzle(client, {
  schema: {
    importTable,
  },
})

export * from './schema/import'
