import db from '@astrojs/db'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'
import vitals from '@astrojs/web-vitals'
import env from '@wes/env'
import compressor from 'astro-compressor'
import { defineConfig } from 'astro/config'
import process from 'node:process'

const workspace = process.cwd().split('/').slice(0, -2).join('/')

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  site: env.APP_URL ?? `https://${env.VERCEL_URL}`,
  devToolbar: { enabled: env.isDev },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt-br'],
  },
  integrations: [db(), vitals(), mdx(), sitemap(), tailwind(), env.isProd && compressor()],
  adapter: vercel(),
  vite: { envDir: workspace },
  experimental: {
    actions: true,
  },
})
