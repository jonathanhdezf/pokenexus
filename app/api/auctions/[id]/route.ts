import { prisma } from "@/lib/prisma";
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
