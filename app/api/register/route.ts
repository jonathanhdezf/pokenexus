import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, username, password } = await req.json();

        if (!email || !username || !password) {
            return NextResponse.json({ message: "Missing fields" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Creating user:", email);

        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
                name: username, // Default name to username
                walletBalance: 10000.00, // Give them $10k to start trading!
            },
        });

        console.log("User created successfully with ID:", user.id);
        return NextResponse.json({ message: "User created", userId: user.id });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ message: "Error creating user" }, { status: 500 });
    }
}
