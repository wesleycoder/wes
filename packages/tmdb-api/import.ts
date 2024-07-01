import '@total-typescript/ts-reset'
import env from '@wes/env'
import { Client as QStashClient } from '@upstash/qstash'
import { formatDate } from 'date-fns/format'
import { gunzipSync } from 'node:zlib'
import { z } from 'zod'

export const importTypes = [
  'movie',
  'tv_series',
  'person',
  'collection',
  'tv_network',
  'keyword',
  'production_company',
] as const

type ImportType = (typeof importTypes)[number]

const getExportFileName = (type: ImportType, date = new Date()) =>
  `${type}_ids_${formatDate(date, 'MM_dd_yyyy')}.json.gz`

const qstash = new QStashClient({ token: env.QSTASH_TOKEN })

export const importLineSchema = z.object({
  id: z.number().int(),
  original_title: z.string(),
  popularity: z.number().default(0),
  video: z.boolean().default(false),
  adult: z.boolean().default(false),
})

export const importQueueItem = importLineSchema.extend({ type: z.enum(importTypes) })
export type ImportQueueItem = z.infer<typeof importQueueItem>

export const updateImports = async (type: ImportType) => {
  const file = await fetch(`${env.TMDB_FILES_URL}/${getExportFileName(type)}`)
  const buffer = gunzipSync(await file.arrayBuffer())
  const text = new TextDecoder().decode(buffer)
  const content = text.slice(0, 965) // TODO: remove this line after testing

  const lines = content
    .split(/\n/)
    .map((line) => {
      if (!line) return
      const { success, data } = importLineSchema.safeParse(JSON.parse(line))
      if (!success) return
      return data
    })
    .filter(Boolean)

  await qstash.batch(
    lines.map((line) => ({
      body: JSON.stringify({ ...line, type }),
      topic: `tmdb_import_${type}`,
      headers: { 'Content-Type': 'application/json' },
    }))
  )

  return new Response('OK')
}

export const processImport = async (item: ImportQueueItem) => {
  const { id, type, ...rest } = item
  return new Response('OK')
}
