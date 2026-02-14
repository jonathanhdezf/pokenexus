const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany();
    console.log('--- USERS IN DB ---');
    users.forEach(u => {
        console.log(`ID: ${u.id}, Email: ${u.email}, Password Set: ${!!u.password}`);
    });
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
