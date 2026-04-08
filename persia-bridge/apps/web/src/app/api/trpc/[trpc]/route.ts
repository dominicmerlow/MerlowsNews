import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@persia-bridge/api'
import { createContext } from '@persia-bridge/api'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext(req),
  })

export { handler as GET, handler as POST }
