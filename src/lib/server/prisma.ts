import { DATABASE_URL } from '$env/static/private';
import type Prisma from '@prisma/client/edge';
import { PrismaClient } from '@prisma/client/edge';

const options: Prisma.Prisma.PrismaClientOptions = {
	datasources: {
		db: {
			url: DATABASE_URL
		}
	}
};

export const prisma = new PrismaClient(options) as Prisma.PrismaClient;
