import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient({
	datasources: {
		db: {
			url: process.env.DATABASE_URL
		}
	}
});

async function seed() {
	await prisma.$transaction([]);
	console.log('Database seeded.');
}

async function flush() {
	await prisma.$transaction([]);

	console.log('Database flushed.');
}

if (!process.argv.includes('--no-flush')) {
	await flush();
}

if (!process.argv.includes('--no-seed')) {
	await seed();
}

console.log('All set.');
