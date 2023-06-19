import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';
import type { AppRouter } from '$lib/server/trpc/_app';

let browserClient: ReturnType<typeof createTRPCClient<AppRouter>>;

const slug = '/trpc';

export const client = (init?: TRPCClientInit) => {
	if (
		typeof window === 'undefined' ||
		typeof (globalThis as typeof globalThis & { EdgeRuntime: typeof globalThis | undefined })
			.EdgeRuntime != 'undefined'
	) {
		return createTRPCClient<AppRouter>({
			url: slug,
			init
		});
	}

	if (!browserClient)
		browserClient = createTRPCClient<AppRouter>({
			url: slug
		});

	return browserClient;
};
