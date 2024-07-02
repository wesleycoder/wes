import { config } from '@dotenvx/dotenvx'
import { z } from 'zod'

const workspace = process.cwd().split('/').slice(0, -2).join('/')
const { NODE_ENV = 'development' } = process.env

const envFiles = [`${workspace}/.env.${NODE_ENV}`, `${workspace}/.env.${NODE_ENV}.local`]
if (!NODE_ENV || NODE_ENV === 'development') envFiles.push(`${workspace}/.env`, `${workspace}/.env.local`)

const dotenv = config({
  path: envFiles,
  convention: 'nextjs',
})

console.log('>>>>> process.env:', process.env)
console.log('>>>>> dotenv:', dotenv.parsed)

const envSchema = z.object({
  DB_URL: z.string(),
  DB_FILE_URL: z.string().optional(),
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
