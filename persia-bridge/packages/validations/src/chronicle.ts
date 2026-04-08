import { z } from 'zod'
import { ArticleTypeSchema } from './enums'

export const ArticleCreateSchema = z.object({
  title: z.string().min(5).max(200),
  subtitle: z.string().max(150).optional(),
  body: z.string().min(100),
  type: ArticleTypeSchema,
  accessLevel: z.enum(['public_teaser', 'members', 'members_only']).default('members'),
  language: z.string().length(2).default('en'),
  tagIds: z.array(z.string()).max(10).optional(),
  heroImageUrl: z.string().url().optional(),
  seoTitle: z.string().max(70).optional(),
  seoDescription: z.string().max(160).optional(),
  isSponsored: z.boolean().default(false),
})

export const CommentCreateSchema = z.object({
  articleId: z.string().cuid(),
  body: z.string().min(1).max(2000),
})

export type ArticleCreate = z.infer<typeof ArticleCreateSchema>
export type CommentCreate = z.infer<typeof CommentCreateSchema>
