
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    console.error("Missing credentials");
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!user) {
                    console.error("User not found:", credentials.email);
                    return null;
                }

                if (!user.password) {
                    console.error("User has no password set (likely OAuth user):", credentials.email);
                    return null;
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);

                if (!isValid) {
                    console.error("Invalid password for user:", credentials.email);
                    return null;
                }

                console.log("Login successful for:", user.email);

                return {
                    id: user.id,
                    name: user.name || user.username,
                    email: user.email,
                    image: user.image,
                    username: user.username,
                    walletBalance: user.walletBalance,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                const u = user as any;
                token.id = u.id;
                token.username = u.username;
                token.walletBalance = u.walletBalance;
            }

            // Allow updating the session (e.g. after purchase)
            if (trigger === "update" && session?.user?.walletBalance !== undefined) {
                token.walletBalance = session.user.walletBalance;
            }

            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                (session.user as any).id = token.id;
                (session.user as any).username = token.username;
                (session.user as any).walletBalance = token.walletBalance;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET || "pokenexus-development-secret-123",
};

export const getSession = () => getServerSession(authOptions);
