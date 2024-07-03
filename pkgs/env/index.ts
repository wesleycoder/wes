import { config } from 'dotenv'
import { z } from 'zod'

const workspace = process.cwd().split('/').slice(0, -2).join('/')
const { NODE_ENV = 'development' } = process.env

const envFiles = [`${workspace}/.env.${NODE_ENV}`, `${workspace}/.env.${NODE_ENV}.local`]
if (!NODE_ENV || NODE_ENV === 'development') envFiles.push(`${workspace}/.env`, `${workspace}/.env.local`)

const dotenv = config({ path: envFiles })

const envSchema = z.object({
  APP_URL: z.string().optional(),
  DB_URL: z.string(),
  DB_FILE_URL: z.string().optional(),
  DB_AUTH_TOKEN: z.string().optional(),
  TMDB_API_KEY: z.string(),
  TMDB_ACCESS_TOKEN: z.string(),
  TMDB_API_URL: z.string(),
  TMDB_FILES_URL: z.string(),
  QSTASH_TOKEN: z.string().optional().default(''),
  VERCEL_URL: z.string().optional().default('http://localhost:3000'),
})

export type Env = z.infer<typeof envSchema>

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}

export default envSchema
  .extend({
    isDev: z.boolean().default(NODE_ENV === 'development'),
    isProd: z.boolean().default(NODE_ENV === 'production'),
    isTest: z.boolean().default(NODE_ENV === 'test'),
  })
  .parse({ ...process.env, ...dotenv.parsed })
