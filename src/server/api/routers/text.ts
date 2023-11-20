import { eq } from "drizzle-orm"
import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { texts } from "~/server/db/schema"

export const textRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        text: z
          .string()
          .min(1, "Must not be empty")
          .max(
            3000,
            "Exceed 3000 characters, chill out, use a text file or something",
          ),
        boardId: z.string().min(6),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      return await ctx.db.insert(texts).values({
        content: input.text,
        boardId: input.boardId,
      })
    }),

  getAll: publicProcedure
    .input(z.object({ boardId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.texts.findMany({
        where: eq(texts.boardId, input.boardId),
        orderBy: (texts, { desc }) => [desc(texts.createdAt)],
      })
    }),

  deleteAll: publicProcedure
    .input(z.object({ boardId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(texts).where(eq(texts.boardId, input.boardId))
    }),

  deleteById: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(texts).where(eq(texts.id, input.id))
    }),
})

export type TextRouter = typeof textRouter
