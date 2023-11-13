import { eq } from "drizzle-orm"
import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { board } from "~/server/db/schema"

export const boardRouter = createTRPCRouter({
  getBoard: publicProcedure
    .input(z.object({ boardId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.board.findFirst({
        where: eq(board.boardId, input.boardId),
      })
    }),

  createRecord: publicProcedure
    .input(
      z.object({
        boardId: z.string(),
        name: z.string(),
        url: z.string(),
        size: z.number(),
        key: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(files).values({
        boardId: input.boardId,
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

  deleteAll: publicProcedure
    .input(z.object({ boardId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const fileKeys = await ctx.db
        .select({ key: files.key })
        .from(files)
        .where(eq(files.boardId, input.boardId))

      // return if there is no files
      if (fileKeys.length === 0) return

      const deleteFileKeys = fileKeys.map((item) => item.key)

      // delete files on the S3
      await utapi.deleteFiles(deleteFileKeys)
      return await ctx.db.delete(files).where(eq(files.boardId, input.boardId))
    }),
})

export type BoardRouter = typeof boardRouter
