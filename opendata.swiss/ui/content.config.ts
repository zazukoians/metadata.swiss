import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      source: 'pages/*.md',
      type: 'page',
      schema: z.object({
        title: z.string(),
        heading: z.string().optional(),
        description: z.string(),
        permalink: z.string().optional(),
      })
    }),
    handbook: defineCollection({
      source: 'handbook/**/*.md',
      type: 'page',
      schema: z.object({
        permalink: z.string(),
      })
    })
  }
})
