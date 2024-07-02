import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'
import env from '@wes/env'
import compressor from 'astro-compressor'
import { defineConfig } from 'astro/config'
import process from 'node:process'

const workspace = process.cwd().split('/').slice(0, -2).join('/')

const adapter = vercel()

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  site: env.APP_URL ?? env.VERCEL_URL,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt-br'],
  },
  integrations: [mdx(), sitemap(), tailwind(), env.NODE_ENV === 'production' && compressor()],
  adapter,
  vite: {
    envDir: workspace,
  },
  experimental: {
    actions: true,
  },
})
