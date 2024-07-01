import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import type { InferNew } from '../utils/infer.ts'
import { ulid } from '../utils/sqlite-types.ts'

export const importTable = sqliteTable('import', {
  id: text('id')
    .primaryKey()
    .$default(() => ulid('import')),
  tmdbId: integer('tmdbid').notNull(),
  type: text('type', { enum: ['movie', 'tv'] }).default('movie'),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .default(sql`NULL`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
})

export type Import = typeof importTable.$inferSelect
export type NewImport = InferNew<typeof importTable.$inferInsert>
