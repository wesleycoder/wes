import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import type { InferNew } from '../utils/infer.ts'
import { date, nanoid } from '../utils/sqlite-types.ts'

export const linkTable = sqliteTable('link', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid(10)),
  url: text('url').notNull(),
  views: integer('views').default(sql`(0)`).notNull(),
  title: text('title'),
  description: text('description'),
  bgUrl: text('bg_url'),
  createdAt: date('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  updatedAt: date('updated_at').$onUpdate(() => new Date()),
})

export type Link = typeof linkTable.$inferSelect
export type NewLink = InferNew<typeof linkTable.$inferInsert>
