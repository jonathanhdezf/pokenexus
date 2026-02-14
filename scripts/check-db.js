const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const count = await prisma.cardCatalog.count();
    console.log(`Cards in DB: ${count}`);
    if (count > 0) {
        const first = await prisma.cardCatalog.findFirst();
        console.log('Sample:', first.name);
    }
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
