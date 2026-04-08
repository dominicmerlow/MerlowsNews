import { SignInForm } from '@/components/shared/SignInForm'

export const metadata = { title: 'Sign In' }

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-accord-900">Persia Bridge</h1>
          <p className="mt-1 text-sm uppercase tracking-widest text-persian-500">
            The Cyrus Accord
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  )
}
