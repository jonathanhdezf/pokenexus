import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await getSession();

    if (!session || !session.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { cardId } = await req.json();

    if (!cardId) {
        return NextResponse.json({ message: "Card ID required" }, { status: 400 });
    }

    try {
        // 1. Get the card and its market price
        const card = await prisma.cardCatalog.findUnique({
            where: { id: cardId },
            include: {
                marketPrices: {
                    orderBy: { recordedAt: 'desc' },
                    take: 1
                }
            }
        });

        if (!card) {
            return NextResponse.json({ message: "Card not found" }, { status: 404 });
        }

        const price = card.marketPrices[0]?.price ? Number(card.marketPrices[0].price) : 0;

        if (price <= 0) {
            return NextResponse.json({ message: "Card unavailable for purchase" }, { status: 400 });
        }

        // 2. Get user wallet balance
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const balance = Number(user.walletBalance);

        if (balance < price) {
            return NextResponse.json({ message: "Insufficient funds" }, { status: 400 });
        }

        // 3. Process Transaction
        // Deduct Funds
        await prisma.user.update({
            where: { id: user.id },
            data: {
                walletBalance: balance - price
            }
        });

        // Add to Collection
        await prisma.userCard.create({
            data: {
                userId: user.id,
                cardId: card.id,
                condition: "Near Mint", // Default for market purchases
                acquiredPrice: price
            }
        });

        return NextResponse.json({ message: "Purchase successful", newBalance: balance - price });

    } catch (error) {
        console.error("Purchase error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
