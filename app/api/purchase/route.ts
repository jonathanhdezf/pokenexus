import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await getSession();

    if (!session || !session.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { listingId } = await req.json();

    if (!listingId) {
        return NextResponse.json({ message: "Listing ID required" }, { status: 400 });
    }

    try {
        // 1. Get the listing and user
        const listing = await prisma.listing.findUnique({
            where: { id: listingId },
            include: { card: true }
        });

        if (!listing || listing.status !== "ACTIVE") {
            return NextResponse.json({ message: "Esta carta ya no está disponible." }, { status: 404 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
        }

        const price = Number(listing.price);
        const balance = Number(user.walletBalance);

        if (balance < price) {
            return NextResponse.json({ message: "Fondos insuficientes" }, { status: 400 });
        }

        // 2. Process Transaction in Atomic Block
        const result = await prisma.$transaction(async (tx) => {
            // Deduct Funds
            const updatedUser = await tx.user.update({
                where: { id: user.id },
                data: {
                    walletBalance: balance - price
                }
            });

            // Mark Listing as SOLD (This makes it disappear from Marketplace fetch)
            await tx.listing.update({
                where: { id: listingId },
                data: { status: "SOLD" }
            });

            // Create Historical Record
            await tx.purchase.create({
                data: {
                    cardId: listing.cardId,
                    cardName: listing.card.name,
                    cardImage: listing.images,
                    sellerId: listing.userId,
                    buyerId: user.id,
                    buyerAlias: user.username || user.name || "Maestro Trainer",
                    price: price,
                    createdAt: new Date()
                }
            });

            // Add to User's Collection
            await tx.userCard.create({
                data: {
                    userId: user.id,
                    cardId: listing.cardId,
                    condition: listing.condition,
                    acquiredPrice: price,
                    acquiredAt: new Date()
                }
            });

            return { newBalance: Number(updatedUser.walletBalance) };
        });

        return NextResponse.json({
            message: "Compra exitosa",
            newBalance: result.newBalance
        });

    } catch (error) {
        console.error("Purchase error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
