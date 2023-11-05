import { eq } from "drizzle-orm"
import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { texts } from "~/server/db/schema"

export const textRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      }
    }),

  create: publicProcedure
    .input(z.object({ content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      await ctx.db.insert(texts).values({
        content: input.content,
      })
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.texts.findFirst({
      orderBy: (texts, { desc }) => [desc(texts.createdAt)],
    })
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.texts.findMany({
      orderBy: (texts, { desc }) => [desc(texts.createdAt)],
    })
  }),

  deleteAll: publicProcedure.mutation(async ({ ctx }) => {
    return await ctx.db.delete(texts)
  }),

  deleteById: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(texts).where(eq(texts.id, input.id))
    }),
})

export type TextRouter = typeof textRouter
