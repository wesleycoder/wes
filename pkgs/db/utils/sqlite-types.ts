import { customType } from 'drizzle-orm/sqlite-core'
import { customAlphabet } from 'nanoid'
import { monotonicFactory } from 'ulid'

const nolookalikes = '346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz' as const

export const ulid = (table?: string) => `${table ? `${table}_` : ''}${monotonicFactory()}`
export const nanoid = (size = 14, table?: string) => `${table ? `${table}_` : ''}${customAlphabet(nolookalikes)(size)}`

export const date = customType<{ data: Date; driverData: string }>({
  dataType() {
    return 'text'
  },
  toDriver(v) {
    return v.toISOString()
  },
  fromDriver(v) {
    return new Date(v)
  },
})
