import { initTRPC, TRPCError } from '@trpc/server';
import type { Context } from './createContext';
import { ZodError } from 'zod';

export const t = initTRPC.context<Context>().create({
	allowOutsideOfServer: true,
	errorFormatter({ shape, error }) {
		console.log(error);

		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
						? error.cause.flatten()
						: null
			}
		};
	}
});

export const router = t.router;
export const middleware = t.middleware;

export const publicProcedure = t.procedure;
