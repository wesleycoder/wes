import mdx from '@astrojs/mdx'
import node from '@astrojs/node'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'
import { defineConfig } from 'astro/config'
import process from 'node:process'

import compressor from 'astro-compressor'

const adapter = process.argv.includes('--node') ? node({ mode: 'standalone' }) : vercel()

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  site: 'https://example.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt-br'],
  },
  integrations: [mdx(), sitemap(), tailwind(), process.env.NODE_ENV === 'production' && compressor()],
  adapter,
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop',
    },
  },
})
