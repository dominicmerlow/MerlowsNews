import { z } from 'zod'

export const SignInSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export const MagicLinkVerifySchema = z.object({
  token: z.string().min(1),
  email: z.string().email(),
})

export const PasswordSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export type SignIn = z.infer<typeof SignInSchema>
export type MagicLinkVerify = z.infer<typeof MagicLinkVerifySchema>
