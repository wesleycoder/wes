import { z } from 'zod'

const envSchema = z.object({
  DB_URL: z.string(),
  DB_AUTH_TOKEN: z.string().optional(),
})

export type Env = z.infer<typeof envSchema>

declare module 'bun' {
  type customEnv = z.infer<typeof envSchema>
  interface Env extends customEnv {}
}

export default envSchema.parse(process.env)
