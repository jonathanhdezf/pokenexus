import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getSession();

    if (!session || !session.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const notifications = await prisma.notification.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
            take: 20
        });

        return NextResponse.json(notifications);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching notifications" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    const session = await getSession();

    if (!session || !session.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { notificationId } = await req.json();

        if (notificationId) {
            // Mark single as read
            await prisma.notification.update({
                where: { id: notificationId },
                data: { read: true }
            });
        } else {
            // Mark all as read
            const user = await prisma.user.findUnique({
                where: { email: session.user.email },
            });
            if (user) {
                await prisma.notification.updateMany({
                    where: { userId: user.id, read: false },
                    data: { read: true }
                });
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ message: "Error updating notifications" }, { status: 500 });
    }
}
