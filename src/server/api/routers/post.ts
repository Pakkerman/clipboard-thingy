import { eq } from "drizzle-orm"
import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { posts } from "~/server/db/schema"

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      }
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      await ctx.db.insert(posts).values({
        name: input.name,
      })
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.posts.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    })
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.posts.findMany({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    })
  }),

  deleteAll: publicProcedure.mutation(async ({ ctx }) => {
    return await ctx.db.delete(posts)
  }),

  deleteById: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(posts).where(eq(posts.id, input.id))
    }),
  // deletePostById: privateProcedure
  // .input(z.object({ postId: z.string() }))
  // .mutation(async ({ ctx, input }) => {
  //   const postId = input.postId

  //   const deletePost = await ctx.prisma.post.delete({ where: { id: postId } })

  //   return deletePost
  // }),
})
