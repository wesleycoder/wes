import { z } from 'zod'
import { config } from 'dotenv'

const workspace = process.cwd().split('/').slice(0, -2).join('/')
const env = config({
  path: [
    `${workspace}/.env`,
    `${workspace}/.env.local`,
    `${workspace}/.env.${process.env.NODE_ENV}`,
    `${workspace}/.env.${process.env.NODE_ENV}.local`,
  ],
})

const envSchema = z.object({
  DB_URL: z.string(),
  DB_AUTH_TOKEN: z.string().optional(),
  TMDB_API_KEY: z.string(),
  TMDB_ACCESS_TOKEN: z.string(),
  TMDB_API_URL: z.string(),
  TMDB_FILES_URL: z.string(),
})

export type Env = z.infer<typeof envSchema>

declare module 'bun' {
  type customEnv = z.infer<typeof envSchema>
  interface Env extends customEnv {}
}

export default envSchema.parse(env.parsed)
