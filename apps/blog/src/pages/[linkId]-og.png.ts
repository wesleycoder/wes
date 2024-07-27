import { db, dz, linkTable } from '@wes/db'
import type { APIRoute } from 'astro'
import sharp from 'sharp'
import { getLinkImage } from '../components/og/linkImage'

export const dynamic = 'force-dynamic'
export const prerender = false

export const GET: APIRoute<{ params: { linkId: string } }> = async ({ params, request }) => {
  const { linkId } = params
  const host = new URL(request.url).origin

  if (!linkId) return new Response('No link id provided', { status: 404 })

  const link = (
    await db
      .select({
        id: linkTable.id,
        title: linkTable.title,
        description: linkTable.description,
        bgUrl: linkTable.bgUrl,
      })
      .from(linkTable)
      .where(dz.eq(linkTable.id, linkId))
      .limit(1)
  )[0]

  if (!link) return new Response(`Link not found: ${linkId}`, { status: 404 })

  const svg = await getLinkImage({
    ...link,
    url: `${host}/${link.id}`,
    host,
  })
  const png = await sharp(Buffer.from(svg)).png().toBuffer()

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
