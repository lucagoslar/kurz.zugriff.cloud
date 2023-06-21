import { prisma } from '$lib/server/prisma';
import { z } from 'zod';
import { publicProcedure, router } from './server';

export const slug = z
	.string()
	.trim()
	.regex(/^[a-zA-Z0-9-]+$/)
	.min(1)
	.max(100);

export const appRouter = router({
	short: router({
		register: publicProcedure
			.input(
				z.object({
					slug,
					url: z.string().url()
				})
			)
			.mutation(async ({ input }) => {
				await prisma.reference.create({ data: { slug: input.slug, url: input.url } });
			}),
		exists: publicProcedure.input(slug).query(async ({ input }) => {
			return new Boolean(
				await prisma.reference.findUnique({
					where: { slug: input },
					select: { id: true }
				})
			);
		}),
		find: publicProcedure.input(slug).query(async ({ input }) => {
			return await prisma.reference.findUnique({ where: { slug: input }, select: { url: true } });
		})
	})
});

export type AppRouter = typeof appRouter;
