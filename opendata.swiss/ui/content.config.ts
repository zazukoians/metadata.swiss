import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      source: 'pages/*.md',
      type: 'page',
      schema: z.object({
        title: z.string(),
        heading: z.string().optional(),
        subHeading: z.string().optional(),
        permalink: z.string().optional(),
      })
    }),
    handbook: defineCollection({
      source: 'handbook/**/*.md',
      type: 'page',
      schema: z.object({
        title: z.string(),
        breadcrumb_title: z.string(),
        permalink: z.string(),
      })
    }),
    blog: defineCollection({
      source: 'blog/*.md',
      type: 'page',
      schema: z.object({
        title: z.string(),
        slug: z.string().optional(),
        date: z.date().optional(),
      })
    })
  }
})
