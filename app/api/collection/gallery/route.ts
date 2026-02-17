import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await getSession();

    if (!session || !session.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { userCardId, galleryImages } = await req.json();

        if (!userCardId || !Array.isArray(galleryImages)) {
            return NextResponse.json({ message: "Invalid data" }, { status: 400 });
        }

        // Verify ownership
        const userCard = await prisma.userCard.findFirst({
            where: {
                id: userCardId,
                user: { email: session.user.email }
            }
        });

        if (!userCard) {
            return NextResponse.json({ message: "Card not found or access denied" }, { status: 404 });
        }

        // Update gallery images
        const updatedCard = await prisma.userCard.update({
            where: { id: userCardId },
            data: {
                galleryImages: JSON.stringify(galleryImages)
            }
        });

        return NextResponse.json({ message: "Galeria actualizada", userCard: updatedCard });

    } catch (error) {
        console.error("Gallery update error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
