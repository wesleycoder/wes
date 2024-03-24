import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), tailwind()],
  adapter: vercel(),
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop',
    },
  },
})
