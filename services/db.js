import { PrismaClient } from '../generated/prisma/client.js';

let client = new PrismaClient();
await client.$connect();
console.log('[DEBUG] Connected to database');
export const prisma = client;