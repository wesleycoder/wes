import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { z } from 'zod'
import type { InferNew } from '../utils/infer.ts'
import { ulid } from '../utils/sqlite-types.ts'

export const genresSchema = z.array(z.object({ id: z.number(), name: z.string() }))
export type GenresType = z.infer<typeof genresSchema>

export const productionCompaniesSchema = z.array(
  z.object({ id: z.number(), name: z.string(), logoPath: z.string(), originCountry: z.string() }),
)
export type ProductionCompaniesType = z.infer<typeof productionCompaniesSchema>

export const productionCountriesSchema = z.array(z.object({ iso_3166_1: z.string(), name: z.string() }))
export type ProductionCountriesType = z.infer<typeof productionCountriesSchema>

export const spokenLanguagesSchema = z.array(
  z.object({ iso_639_1: z.string(), name: z.string(), english_name: z.string() }),
)
export type SpokenLanguagesType = z.infer<typeof spokenLanguagesSchema>

export const importTable = sqliteTable('import', {
  id: text('id')
    .primaryKey()
    .$default(() => ulid('import')),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .default(sql`NULL`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
  adult: integer('adult', { mode: 'boolean' }).notNull().default(false),
  tmdbId: integer('tmdb_id').notNull(),
  imdbId: text('imdb_id').notNull(),
  type: text('type', { enum: ['movie', 'tv'] })
    .notNull()
    .default('movie'),
  backdropPath: text('backdrop_path').notNull(),
  belongsToCollection: text('belongs_to_collection').notNull(),
  budget: integer('budget').notNull().default(0),
  genres: text('genres', { mode: 'json' }).notNull().default('[]').$type<GenresType>(),
  homepage: text('homepage').notNull(),
  originalLanguage: text('original_language').notNull(),
  originalTitle: text('original_title').notNull(),
  overview: text('overview').notNull(),
  popularity: integer('popularity').notNull().default(0),
  posterPath: text('poster_path').notNull(),
  productionCompanies: text('production_companies', { mode: 'json' })
    .notNull()
    .default('[]')
    .$type<ProductionCompaniesType>(),
  productionCountries: text('production_countries', { mode: 'json' })
    .notNull()
    .default('[]')
    .$type<ProductionCountriesType>(),
  releaseDate: text('release_date').notNull(),
  revenue: integer('revenue').notNull().default(0),
  runtime: integer('runtime').notNull().default(0),
  spokenLanguages: text('spoken_languages', { mode: 'json' }).notNull().default('[]').$type<SpokenLanguagesType>(),
  status: text('status').notNull(),
  tagline: text('tagline').notNull(),
  title: text('title').notNull(),
  video: integer('video', { mode: 'boolean' }).notNull().default(true),
  voteAverage: integer('vote_average').notNull().default(0),
  voteCount: integer('vote_count').notNull().default(0),
})

export type Import = typeof importTable.$inferSelect
export type NewImport = InferNew<typeof importTable.$inferInsert>
