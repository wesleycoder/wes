import { db, linkTable } from '@wes/db'
import type { APIRoute, GetStaticPaths } from 'astro'
import { eq, sql } from 'drizzle-orm'

export const getStaticPaths = (async () => {
  const links = await db.query.linkTable.findMany()
  return links.map((link) => ({ params: { linkId: link.id } }))
}) satisfies GetStaticPaths

export const GET: APIRoute = async (ctx) => {
  const { linkId } = ctx.params

  if (!linkId) return new Response(null, { status: 404 })

  const link = await db.query.linkTable.findFirst({ where: eq(linkTable.id, linkId) })

  if (!link) return new Response(null, { status: 404 })

  const linkUrl = link.url

  await db
    .update(linkTable)
    .set({ views: sql`${linkTable.views} + 1` })
    .where(eq(linkTable.id, linkId))

  const response = ctx.redirect(linkUrl, 301)
  response.headers.set('Cache-Control', 'no-store,no-cache,must-revalidate,max-age=0')
  return response
}
