import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const listing = await prisma.listing.findUnique({
            where: { id: params.id },
            include: {
                card: true,
                bids: {
                    orderBy: { amount: 'desc' },
                    take: 10,
                    include: {
                        user: {
                            select: { name: true, image: true, username: true }
                        }
                    }
                }
            }
        });

        if (!listing) {
            return NextResponse.json({ message: "Auction not found" }, { status: 404 });
        }

        const currentPrice = listing.bids[0]?.amount ? Number(listing.bids[0].amount) : Number(listing.price);

        return NextResponse.json({
            price: currentPrice,
            endsAt: listing.endsAt,
            bids: listing.bids,
            status: listing.status
        });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching auction" }, { status: 500 });
    }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
    const session = await getSession();

    if (!session || !session.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { amount } = await req.json();
    const bidAmount = Number(amount);

    if (!bidAmount || isNaN(bidAmount)) {
        return NextResponse.json({ message: "Invalid bid amount" }, { status: 400 });
    }

    try {
        return await prisma.$transaction(async (tx) => {
            // 1. Get auction details
            const listing = await tx.listing.findUnique({
                where: { id: params.id },
                include: {
                    card: true,
                    bids: {
                        orderBy: { amount: 'desc' },
                        take: 1
                    }
                }
            });

            if (!listing || listing.status !== "ACTIVE" || (listing.endsAt && new Date(listing.endsAt) < new Date())) {
                throw new Error("Auction is no longer active");
            }

            const currentPrice = listing.bids[0]?.amount ? Number(listing.bids[0].amount) : Number(listing.price);
            const minIncrement = Math.max(1, Math.round(currentPrice * 0.05)); // 5% increment minimum
            const minRequired = currentPrice + minIncrement;

            if (bidAmount < minRequired) {
                throw new Error(`Minimum bid required: $${minRequired}`);
            }

            // 2. Get user and check balance
            const user = await tx.user.findUnique({
                where: { email: session.user?.email! }
            });

            if (!user) throw new Error("User not found");
            if (Number(user.walletBalance) < bidAmount) {
                throw new Error("Insufficient funds in wallet");
            }

            // 3. Place Bid
            const newBid = await tx.bid.create({
                data: {
                    amount: bidAmount,
                    listingId: listing.id,
                    userId: user.id
                },
                include: {
                    user: { select: { username: true, image: true, name: true } }
                }
            });

            // 4. Notify previous bidder if exists
            if (listing.bids[0] && listing.bids[0].userId !== user.id) {
                await tx.notification.create({
                    data: {
                        userId: listing.bids[0].userId,
                        type: "OUTBID",
                        title: "You've been outbid!",
                        message: `Someone placed a higher bid of $${bidAmount} on ${listing.card.name}.`,
                        link: `/auctions/${listing.id}`
                    }
                });
            }

            // 4. Update the current price in history if needed (optional)

            return NextResponse.json({
                success: true,
                newBid: {
                    ...newBid,
                    amount: Number(newBid.amount),
                    placedAt: newBid.placedAt.toISOString()
                },
                currentPrice: bidAmount
            });
        });
    } catch (error: any) {
        console.error("Bidding error:", error);
        return NextResponse.json({ message: error.message || "Internal server error" }, { status: 400 });
    }
}
