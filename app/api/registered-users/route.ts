import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                username: true,
                createdAt: true,
                image: true,
            },
        });

        return NextResponse.json({ users });
    } catch (error) {
        return NextResponse.json({ users: [] });
    }
}
