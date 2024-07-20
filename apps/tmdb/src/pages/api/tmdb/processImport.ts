import { importQueueItem, importTypes, processImport } from '@wes/tmdb-api/import'
import type { APIRoute } from 'astro'

export const prerender = false

export const GET: APIRoute = async ({ params }) => {
  const { success, data } = importQueueItem.safeParse(params)
  if (!success) {
    return new Response(`Invalid type, should be one of: \n${importTypes.join('\n')}`, { status: 400 })
  }

  await processImport(data)

  return new Response('OK')
}
