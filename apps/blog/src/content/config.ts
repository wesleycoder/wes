import { defineCollection, z } from 'astro:content'

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  heroImage: z.string().optional(),
})

const draft = defineCollection({
  type: 'content',
  schema: postSchema,
})

const blog = defineCollection({
  type: 'content',
  schema: postSchema.extend({
    publishedAt: z.coerce.date(),
  }),
})

export const collections = { blog, draft }
