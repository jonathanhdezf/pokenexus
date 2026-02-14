const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('--- SEEDING AUCTIONS ---');

    // 1. Get a user to be the seller (admin or first user by email if exists, or just first)
    let seller = await prisma.user.findFirst();

    if (!seller) {
        console.log("No user found. Creating dummy seller...");
        seller = await prisma.user.create({
            data: {
                username: "auctionmaster",
                email: "auctions@pokenexus.com",
                name: "Auction Master",
                password: "password123", // Dummy password
                walletBalance: 1000000
            }
        });
    }

    // 2. Get some cards to auction
    const cards = await prisma.cardCatalog.findMany({ take: 6 });
    if (cards.length === 0) {
        console.error("No cards found in catalog. Run seed-db first.");
        return;
    }

    console.log(`Found ${cards.length} cards to potentially auction.`);

    // 3. Create active auctions
    for (const card of cards) {
        // Generate random end date: 2 hours to 3 days from now
        const now = new Date();
        const hoursToAdd = Math.floor(Math.random() * 72) + 2;
        const endsAt = new Date(now.getTime() + hoursToAdd * 60 * 60 * 1000);

        // Random starting price
        const startPrice = Math.floor(Math.random() * 500) + 50;

        const listing = await prisma.listing.create({
            data: {
                userId: seller.id,
                cardId: card.id,
                type: 'AUCTION',
                price: startPrice,
                condition: 'Near Mint',
                images: JSON.stringify([card.imageUrl]), // Store as JSON string array
                status: 'ACTIVE',
                endsAt: endsAt
            }
        });
        console.log(`Created auction for ${card.name}: ${listing.id} (Ends in ${hoursToAdd}h)`);
    }

    console.log('--- AUCTIONS SEEDED ---');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
