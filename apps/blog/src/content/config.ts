import { defineCollection, z, type SchemaContext } from 'astro:content'

const postSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    description: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    heroImage: image().optional(),
  })

const draft = defineCollection({
  type: 'content',
  schema: postSchema,
})

const blog = defineCollection({
  type: 'content',
  schema: (ctx) =>
    postSchema(ctx).extend({
      publishedAt: z.coerce.date(),
    }),
})

export const collections = { blog, draft }
