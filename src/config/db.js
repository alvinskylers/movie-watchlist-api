import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" 
        ? ["query", "warn", "error"] 
        : ["error"], 
});

const connectDatabase = async () => {
    try {
        await prisma.$connect();
        console.log("Database connected via Prisma");
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
        process.exit(1);
    }
};  

const disconnectDatabase = async () => {
    await prisma.$disconnect();
}

export { prisma, connectDatabase, disconnectDatabase};