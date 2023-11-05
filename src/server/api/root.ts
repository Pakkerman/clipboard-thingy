import { createTRPCRouter } from "~/server/api/trpc"
import { fileRouter } from "./routers/file"
import { textRouter } from "./routers/text"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  file: fileRouter,
  text: textRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
