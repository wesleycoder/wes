import rss from '@astrojs/rss'
import { db, linkTable } from '@wes/db'
import { getCollection } from 'astro:content'
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts'

export async function GET(context) {
  let items = []

  const posts = await getCollection('blog')
  items = items.concat(
    posts
      .filter((p) => !!p.data.publishedAt)
      .map((post) => ({
        ...post.data,
        pubDate: post.data.publishedAt.toUTCString(),
        link: `/blog/${post.slug}`,
      })),
  )

  const links = await db.select().from(linkTable)
  items = items.concat(
    links.map((link) => ({
      ...link,
      pubDate: link.createdAt.toUTCString(),
      link: `/${link.id}`,
    })),
  )

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items,
  })
}
