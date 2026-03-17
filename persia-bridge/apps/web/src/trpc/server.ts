import 'server-only'
import { createCallerFactory } from '@persia-bridge/api'
import { createContext } from '@persia-bridge/api'
import { appRouter } from '@persia-bridge/api'
import { cache } from 'react'

const createCaller = createCallerFactory(appRouter)

export const caller = cache(async () => {
  const ctx = await createContext()
  return createCaller(ctx)
})
