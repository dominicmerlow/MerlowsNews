import { router } from './trpc'
import { memberRouter } from './routers/member'
import { chronicleRouter } from './routers/chronicle'
import { chaptersRouter } from './routers/chapters'
import { notificationsRouter } from './routers/notifications'

export const appRouter = router({
  member: memberRouter,
  chronicle: chronicleRouter,
  chapters: chaptersRouter,
  notifications: notificationsRouter,
})

export type AppRouter = typeof appRouter
