import { db } from '@wes/db'
import { linkTable } from '@wes/db/schema/link'
import type { APIRoute } from 'astro'
import { eq, sql } from 'drizzle-orm'

export const GET: APIRoute = async ({ params, redirect }) => {
  const { linkId: id } = params

  if (!id) return new Response(null, { status: 404 })

  const links = await db.select().from(linkTable).where(eq(linkTable.id, id))

  if (!links.length || !links[0]) {
    return new Response(null, { status: 404, statusText: 'Link not found' })
  }

  await db
    .update(linkTable)
    .set({ views: sql`${linkTable.views} + 1` })
    .where(eq(linkTable.id, links[0].id))

  const res = redirect(links[0].url, 302)
  res.headers.set('Content-Type', 'text/html')
  res.headers.set('Content-Disposition', 'inline')
  return res
}

export const getStaticPaths = async () => {
  const links = await db.query.linkTable.findMany()
  return links.map(({ id }) => ({ params: { linkId: id } }))
}
