'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@persia-bridge/ui'
import { SignInSchema, type SignIn } from '@persia-bridge/validations'
import { signIn } from 'next-auth/react'

export function SignInForm() {
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<SignIn>({
    resolver: zodResolver(SignInSchema),
  })

  const onSubmit = async (data: SignIn) => {
    await signIn('resend', { email: data.email, redirect: false })
    setSent(true)
  }

  if (sent) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p className="font-medium">Check your email</p>
          <p className="mt-2 text-sm text-muted-foreground">
            We sent a sign-in link to <strong>{getValues('email')}</strong>. It expires in 15
            minutes.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Enter your email to receive a sign-in link.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send sign-in link'}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Not a member?{' '}
          <a href="/apply" className="text-primary hover:underline">
            Apply to join
          </a>
        </p>
      </CardContent>
    </Card>
  )
}
