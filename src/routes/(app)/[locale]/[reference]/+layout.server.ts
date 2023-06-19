import type { LayoutServerLoad } from './$types';

import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { slug } from '$lib/server/trpc/_app';

export const load: LayoutServerLoad = async (event) => {
	const { success } = slug.safeParse(event.params.reference);
	if (!success) throw error(400);

	let reference = await prisma.reference.findUnique({
		where: { slug: event.params.reference }
	});

	if (!reference) throw error(404);

	return {
		reference
	};
};
