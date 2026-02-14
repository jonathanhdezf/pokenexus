export { }; // Ensure this is treated as a module

async function main() {
    const setsToSeed = [
        { id: 'base1', name: 'Base Set' },
        { id: 'swsh7', name: 'Evolving Skies' } // Umbreon VMAX Alt Art is here
    ];

    console.log('🚀 Starting TCG seed...');

    try {
        const { PrismaClient } = await import('@prisma/client');
        const prisma = new PrismaClient();

        for (const set of setsToSeed) {
            console.log(`\n📦 Fetching cards for set: ${set.name} (${set.id})...`);

            const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${set.id}`);
            const data = await response.json();

            if (!data.data || !Array.isArray(data.data)) {
                console.error(`❌ Error fetching set ${set.id}: Invalid response`, data);
                continue;
            }

            const cards = data.data;
            console.log(`🃏 Found ${cards.length} cards. Importing to database...`);

            let count = 0;
            for (const card of cards) {
                // Insert or Update CardCatalog
                const createdCard = await prisma.cardCatalog.upsert({
                    where: { apiId: card.id },
                    update: {
                        name: card.name,
                        set: card.set.name,
                        rarity: card.rarity || 'Common',
                        imageUrl: card.images?.large || card.images?.small,
                        tcgPlayerUrl: card.tcgplayer?.url,
                    },
                    create: {
                        apiId: card.id,
                        name: card.name,
                        set: card.set.name,
                        cardNumber: card.number,
                        rarity: card.rarity || 'Common',
                        imageUrl: card.images?.large || card.images?.small,
                        releaseDate: new Date(card.set.releaseDate?.replace(/\//g, '-') || new Date()),
                        tcgPlayerUrl: card.tcgplayer?.url,
                    }
                });

                // Insert Market Prices if available
                if (card.tcgplayer?.prices) {
                    const prices = card.tcgplayer.prices;

                    const pricePoints = [];
                    if (prices.holofoil?.mid) pricePoints.push({ condition: 'Holofoil Market', price: prices.holofoil.mid });
                    if (prices.normal?.mid) pricePoints.push({ condition: 'Normal Market', price: prices.normal.mid });
                    if (prices['1stEditionHolofoil']?.mid) pricePoints.push({ condition: '1st Edition Holo', price: prices['1stEditionHolofoil'].mid });

                    for (const point of pricePoints) {
                        await prisma.marketPrice.create({
                            data: {
                                cardId: createdCard.id,
                                source: 'TCGPlayer',
                                condition: point.condition,
                                price: point.price
                            }
                        });
                    }
                }
                count++;
                // Log progress every 20 cards
                if (count % 20 === 0) process.stdout.write('.');
            }
            console.log(`\n✅ Set ${set.name} imported successfully!`);
        }

        console.log('\n🎉 Seeding completed!');
        await prisma.$disconnect();

    } catch (error) {
        console.error('❌ Critical error during seeding:', error);
        process.exit(1);
    }
}

main();
