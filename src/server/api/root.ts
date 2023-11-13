import { createTRPCRouter } from "~/server/api/trpc"
import { fileRouter } from "./routers/file"
import { textRouter } from "./routers/text"
import { boardRouter } from "./routers/board"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  file: fileRouter,
  text: textRouter,
  board: boardRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
