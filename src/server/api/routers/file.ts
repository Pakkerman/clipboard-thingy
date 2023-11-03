import { eq } from "drizzle-orm"
import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { files } from "~/server/db/schema"

// uploadthing api
import { UTApi } from "uploadthing/server"
export const utapi = new UTApi()

export const fileRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.files.findMany({
      orderBy: (files, { desc }) => [desc(files.createdAt)],
    })
  }),

  createRecord: publicProcedure
    .input(
      z.object({
        name: z.string(),
        url: z.string(),
        size: z.number(),
        key: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(files).values({
        name: input.name,
        url: input.url,
        size: input.size,
        key: input.key,
      })
    }),

  deleteRecord: publicProcedure
    .input(z.object({ id: z.number(), key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(files).where(eq(files.id, input.id))
      await utapi.deleteFiles(input.key)
    }),
})

export type FileRouter = typeof fileRouter
