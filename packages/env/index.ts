import { config } from 'dotenv'
import { z } from 'zod'

const workspace = process.cwd().split('/').slice(0, -2).join('/')
const { NODE_ENV = 'development' } = process.env

const dotenv = config({
  path: [
    `${workspace}/.env`,
    `${workspace}/.env.local`,
    `${workspace}/.env.${NODE_ENV}`,
    `${workspace}/.env.${NODE_ENV}.local`,
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

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}

export default envSchema.parse({ ...process.env, ...dotenv.parsed })
