import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { cardId: string } }
) {
    const session = await getSession();

    if (!session || !session.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const history = await prisma.purchase.findMany({
            where: { cardId: params.cardId },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(history);
    } catch (error) {
        console.error("History fetch error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
