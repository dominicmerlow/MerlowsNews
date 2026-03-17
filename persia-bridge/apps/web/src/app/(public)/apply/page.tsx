import { ApplicationForm } from '@/components/shared/ApplicationForm'

export const metadata = { title: 'Apply for Membership' }

export default function ApplyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-persian-500">
          The Cyrus Accord
        </p>
        <h1 className="mb-4 text-4xl font-bold text-accord-900">Apply for Membership</h1>
        <p className="text-lg text-muted-foreground">
          Membership is by application only. All applications are reviewed by our team within 72
          hours.
        </p>
      </div>
      <ApplicationForm />
    </div>
  )
}
