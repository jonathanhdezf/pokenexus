const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SAMPLE_CARDS = [
    {
        id: "base1-4",
        name: "Charizard",
        set: "Base Set",
        cardNumber: "4",
        rarity: "Rare Holo",
        imageUrl: "https://images.pokemontcg.io/base1/4_hires.png",
        releaseDate: "1999-01-09",
        prices: [
            { condition: "Gem Mint (PSA 10)", price: 350000, source: "Market Avg" },
            { condition: "Near Mint", price: 400, source: "TCGPlayer" }
        ]
    },
    {
        id: "pl3-112",
        name: "Pikachu Illustrator",
        set: "Promos",
        cardNumber: "112",
        rarity: "Promo",
        imageUrl: "https://images.pokemontcg.io/pl3/112_hires.png", // Aproximación
        releaseDate: "1998-01-01",
        prices: [
            { condition: "PSA 9", price: 4200000, source: "Logan Paul Sale" }
        ]
    },
    {
        id: "swsh7-215",
        name: "Umbreon VMAX",
        set: "Evolving Skies",
        cardNumber: "215",
        rarity: "Rare Secret",
        imageUrl: "https://images.pokemontcg.io/swsh7/215_hires.png",
        releaseDate: "2021-08-27",
        prices: [
            { condition: "Near Mint", price: 650, source: "TCGPlayer" },
            { condition: "PSA 10", price: 1200, source: "eBay Last Sold" }
        ]
    },
    {
        id: "sm115-69",
        name: "Mewtwo & Mew GX",
        set: "Unified Minds",
        cardNumber: "69",
        rarity: "Rare Holo GX",
        imageUrl: "https://images.pokemontcg.io/sm11/71_hires.png",
        releaseDate: "2019-08-02",
        prices: [
            { condition: "Near Mint", price: 150, source: "TCGPlayer" }
        ]
    }
];

async function main() {
    console.log('🚀 Starting TCG seed (Local Backup Mode)...');

    try {
        for (const card of SAMPLE_CARDS) {
            console.log(`Creating ${card.name}...`);

            const createdCard = await prisma.cardCatalog.upsert({
                where: { apiId: card.id },
                update: {},
                create: {
                    apiId: card.id,
                    name: card.name,
                    set: card.set,
                    cardNumber: card.cardNumber,
                    rarity: card.rarity,
                    imageUrl: card.imageUrl,
                    releaseDate: new Date(card.releaseDate),
                }
            });

            for (const price of card.prices) {
                await prisma.marketPrice.create({
                    data: {
                        cardId: createdCard.id,
                        source: price.source,
                        condition: price.condition,
                        price: price.price
                    }
                });
            }
        }

        console.log('\n🎉 Seeding completed with sample data!');

        // Intentar API real en segundo plano o dejarlo como ejercicio
        console.log('ℹ To import full sets via API, ensure node-fetch is working and uncomment the API section in the script.');

    } catch (error) {
        console.error('❌ Error during seeding:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
