// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Export the instance
export default prisma;