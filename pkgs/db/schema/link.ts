import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import type { InferNew } from '../utils/infer.ts'
import { date, nanoid } from '../utils/sqlite-types.ts'

export const linkTable = sqliteTable('link', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid(10)),
  url: text('url').notNull().unique(),
  views: integer('views').notNull().default(sql`(0)`),
  createdAt: date('created_at')
    .notNull()
    .$default(() => new Date()),
  updatedAt: date('updated_at').$onUpdate(() => new Date()),
})

export type Link = typeof linkTable.$inferSelect
export type NewLink = InferNew<typeof linkTable.$inferInsert>
