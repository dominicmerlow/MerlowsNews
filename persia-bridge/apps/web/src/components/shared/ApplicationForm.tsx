'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Button, Input, Card, CardContent } from '@persia-bridge/ui'
import { ApplicationSchema, type Application } from '@persia-bridge/validations'
import { trpc } from '@/trpc/client'

export function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Application>({
    resolver: zodResolver(ApplicationSchema),
  })

  const submit = trpc.member.apply.useMutation({
    onSuccess: () => setSubmitted(true),
  })

  const onSubmit = (data: Application) => submit.mutate(data)

  if (submitted) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <h2 className="text-xl font-bold text-accord-900">Application received</h2>
          <p className="mt-3 text-muted-foreground">
            Thank you. Our team will review your application within 72 hours and contact you at the
            email you provided.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Full name *</label>
          <Input {...register('fullName')} placeholder="Dariush Tehrani" />
          {errors.fullName && <p className="mt-1 text-xs text-destructive">{errors.fullName.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Email address *</label>
          <Input type="email" {...register('email')} placeholder="d.tehrani@example.com" />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Community identity *</label>
        <select
          {...register('communityIdentity')}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Select...</option>
          <option value="IRANIAN_DIASPORA">Iranian Diaspora</option>
          <option value="JEWISH_ISRAELI_DIASPORA">Jewish / Israeli Diaspora</option>
          <option value="FRIEND_OF_THE_ACCORD">Friend of The Accord</option>
        </select>
        {errors.communityIdentity && <p className="mt-1 text-xs text-destructive">{errors.communityIdentity.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Country of residence *</label>
        <Input {...register('countryCode')} placeholder="GB" maxLength={2} />
        {errors.countryCode && <p className="mt-1 text-xs text-destructive">{errors.countryCode.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Professional background *</label>
        <textarea
          {...register('professionalBackground')}
          rows={4}
          placeholder="Describe your professional background, sector, and expertise..."
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        {errors.professionalBackground && <p className="mt-1 text-xs text-destructive">{errors.professionalBackground.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Why do you want to join The Accord? *</label>
        <textarea
          {...register('whyJoin')}
          rows={3}
          placeholder="Tell us why you want to be part of this community..."
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        {errors.whyJoin && <p className="mt-1 text-xs text-destructive">{errors.whyJoin.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">LinkedIn URL (optional)</label>
        <Input {...register('linkedInUrl')} placeholder="https://linkedin.com/in/..." />
      </div>

      {submit.error && (
        <p className="text-sm text-destructive">Something went wrong. Please try again.</p>
      )}

      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting || submit.isPending}>
        {isSubmitting || submit.isPending ? 'Submitting...' : 'Submit application'}
      </Button>
    </form>
  )
}
