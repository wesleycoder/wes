import { importTypes, updateImports } from '@wes/tmdb-api/import'
import type { APIRoute } from 'astro'
import { z } from 'zod'

export const prerender = false

const paramsSchema = z.object({
  type: z.enum(importTypes),
})

export const GET: APIRoute = async ({ params }) => {
  const { success, data } = paramsSchema.safeParse(params)
  if (!success) {
    return new Response(`Invalid import type, should be one of: \n${importTypes.join('\n')}`, { status: 400 })
  }

  return await updateImports(data.type)
}
