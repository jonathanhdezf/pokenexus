import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const latestUser = await prisma.user.findFirst({
            orderBy: { createdAt: "desc" },
            select: { username: true },
        });

        return NextResponse.json({
            username: latestUser?.username || "Entrenador Anónimo",
        });
    } catch (error) {
        return NextResponse.json({ username: "Entrenador Anónimo" });
    }
}
