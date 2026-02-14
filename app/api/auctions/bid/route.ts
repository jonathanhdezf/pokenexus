import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await getSession();

    console.log("Bid API Session:", JSON.stringify(session, null, 2));

    if (!session || !session.user?.email) {
        console.error("Bid API Unauthorized - Session is null or email missing");
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { listingId, amount } = await req.json();

    if (!listingId || !amount) {
        return NextResponse.json({ message: "Listing ID and Amount required" }, { status: 400 });
    }

    const bidAmount = Number(amount);

    try {
        const result = await prisma.$transaction(async (tx) => {
            // 1. Get Listing & Current Highest Bid
            const listing = await tx.listing.findUnique({
                where: { id: listingId },
                include: {
                    bids: {
                        orderBy: { amount: 'desc' },
                        take: 1,
                    }
                }
            });

            if (!listing) throw new Error("Listing not found");

            // Check if active
            if (listing.status !== 'ACTIVE') throw new Error("Auction is not active");
            if (listing.endsAt && new Date() > listing.endsAt) throw new Error("Auction has ended");

            const highestBid = listing.bids[0];
            const currentPrice = highestBid ? Number(highestBid.amount) : Number(listing.price);

            // Validation: Bid must be higher
            // Increment rule: +$5 if < 100, +$10 if >= 100
            const minIncrement = currentPrice < 100 ? 5 : 10;
            if (bidAmount < currentPrice + minIncrement) {
                throw new Error(`Bid must be at least $${(currentPrice + minIncrement).toLocaleString()}`);
            }

            // 2. Get User to check balance
            const user = await tx.user.findUnique({
                where: { email: session.user?.email! }
            });

            if (!user) throw new Error("User not found");
            if (Number(user.walletBalance) < bidAmount) {
                throw new Error(`Insufficient funds. You have $${Number(user.walletBalance).toLocaleString()}`);
            }

            // 3. Charge New Bidder (Atomic Decrement)
            const updatedUser = await tx.user.update({
                where: { id: user.id },
                data: { walletBalance: { decrement: bidAmount } }
            });

            // 4. Refund Previous Bidder (Atomic Increment)
            if (highestBid) {
                await tx.user.update({
                    where: { id: highestBid.userId },
                    data: { walletBalance: { increment: highestBid.amount } }
                });
                console.log(`Refunded $${highestBid.amount} to user ${highestBid.userId}`);
            }

            // 5. Create New Bid
            const newBid = await tx.bid.create({
                data: {
                    listingId,
                    userId: user.id,
                    amount: bidAmount,
                    placedAt: new Date()
                }
            });

            return {
                newBid,
                newBalance: Number(updatedUser.walletBalance)
            };
        });

        return NextResponse.json({
            message: "Bid placed successfully",
            bid: result.newBid,
            newBalance: result.newBalance
        });

    } catch (error: any) {
        console.error("Bid transaction failed:", error);
        return NextResponse.json({ message: error.message || "Failed to place bid" }, { status: 400 });
    }
}
