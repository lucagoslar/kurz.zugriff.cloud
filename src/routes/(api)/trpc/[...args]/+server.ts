import type { RequestEvent } from '@sveltejs/kit';
import type { AnyRouter, Dict } from '@trpc/server';
import type { RequestHandler } from './$types';

import { createContext } from '$lib/server/trpc/createContext';
import { appRouter } from '$lib/server/trpc/_app';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

async function handler(
	event: RequestEvent,
	router: AnyRouter,
	createContext: any,
	responseMeta?: any,
	onError?: any
) {
	const request = event.request as Request & {
		headers: Dict<string | string[]>;
	};

	return await fetchRequestHandler({
		router,
		req: event.request,
		createContext: async () => createContext?.(event),
		responseMeta,
		onError,
		endpoint: '/trpc'
	});
}

export const GET: RequestHandler = async (event) => {
	return await handler(event, appRouter, createContext);
};

export const POST: RequestHandler = async (event) => {
	return await handler(event, appRouter, createContext);
};
