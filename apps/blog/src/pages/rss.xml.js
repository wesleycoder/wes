import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts'

export async function GET(context) {
  const posts = await getCollection('blog')
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts
      .filter((p) => !!p.data.publishedAt)
      .map((post) => ({
        ...post.data,
        pubDate: new Date(post.data.publishedAt).toUTCString(),
        link: `/blog/${post.slug}/`,
      })),
  })
}
