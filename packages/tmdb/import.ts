import env from '@wes/env'
import { type APIRoute } from 'astro'
import { formatDate } from 'date-fns/format'
import { pipeline } from 'node:stream'
import { createGunzip, gunzip, gunzipSync } from 'node:zlib'

const importTypes = [
  'movie',
  'tv_series',
  'person',
  'collection',
  'tv_network',
  'keyword',
  'production_company',
] as const

type ImportType = (typeof importTypes)[number]

const getExportFileName = (type: ImportType, date = new Date()) => {
  return `${type}_ids_${formatDate(date, 'MM_dd_yyyy')}.json.gz`
}

export const GET: APIRoute = async () => {
  const file = await fetch(`${env.TMDB_FILES_URL}/${getExportFileName('movie')}`)
  const buffer = gunzipSync(await file.arrayBuffer())
  const text = new TextDecoder().decode(buffer)
  const content = text.slice(0, 965)

  return new Response(content)
}
