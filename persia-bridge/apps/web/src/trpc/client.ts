import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@persia-bridge/api'

export const trpc = createTRPCReact<AppRouter>()
