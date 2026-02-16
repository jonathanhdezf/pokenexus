require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const sets = ['base1', 'swsh7', 'sm115']; // Base, Evolving Skies, Hidden Fates
    console.log('🚀 Starting API Population...');

    for (const setId of sets) {
        console.log(`📦 Fetching set: ${setId}...`);
        try {
            const url = `http://api.pokemontcg.io/v2/cards?q=set.id:${setId}&pageSize=50`;
            console.log(`🔗 URL: ${url}`);
            const response = await fetch(url);
            console.log(`📡 Response Status: ${response.status}`);
            const text = await response.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                console.error(`❌ JSON Parse Error for set ${setId}:`, text.substring(0, 100));
                continue;
            }

            if (!data.data) {
                console.error(`❌ No data for set ${setId}`);
                continue;
            }

            console.log(`🃏 Found ${data.data.length} cards. Importing...`);

            for (const item of data.data) {
                const card = await prisma.cardCatalog.upsert({
                    where: { apiId: item.id },
                    update: {
                        imageUrl: item.images?.large || item.images?.small,
                        rarity: item.rarity || 'Common',
                    },
                    create: {
                        apiId: item.id,
                        name: item.name,
                        set: item.set.name,
                        cardNumber: item.number,
                        rarity: item.rarity || 'Common',
                        imageUrl: item.images?.large || item.images?.small,
                        releaseDate: new Date(item.set.releaseDate.replace(/\//g, '-')),
                        tcgPlayerUrl: item.tcgplayer?.url,
                    }
                });

                // Add market price
                if (item.tcgplayer?.prices) {
                    const prices = item.tcgplayer.prices;
                    const marketPrice = prices.holofoil?.mid || prices.normal?.mid || prices.reverseHolofoil?.mid;

                    if (marketPrice) {
                        await prisma.marketPrice.create({
                            data: {
                                cardId: card.id,
                                source: 'TCGPlayer',
                                condition: 'Market',
                                price: marketPrice
                            }
                        });
                    }
                }
            }
            console.log(`✅ Set ${setId} complete.`);
        } catch (err) {
            console.error(`❌ Error in set ${setId}:`, err.message);
        }
    }

    console.log('🎉 Marketplace populated successfully!');
    await prisma.$disconnect();
}

main();
