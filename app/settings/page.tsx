import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { User, Mail, Shield, Wallet, Bell, Save } from "lucide-react";
import Image from "next/image";

export default async function SettingsPage() {
    const session = await getSession();

    if (!session) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user?.email! },
    });

    if (!user) return <div>User not found</div>;

    return (
        <main className="min-h-screen pt-24 px-6 max-w-4xl mx-auto pb-20">
            <h1 className="text-3xl font-bold font-display mb-8">Account Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Sidebar Navigation */}
                <div className="md:col-span-3 space-y-2">
                    <button className="w-full text-left px-4 py-2 bg-surface border-l-2 border-primary text-white font-medium rounded-r-lg">Profile</button>
                    <button className="w-full text-left px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Security</button>
                    <button className="w-full text-left px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Wallet</button>
                    <button className="w-full text-left px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Notifications</button>
                </div>

                {/* Content Area */}
                <div className="md:col-span-9 space-y-8">

                    {/* Profile Information Section */}
                    <section className="bg-surface border border-white/10 rounded-xl p-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-primary" /> Personal Information
                        </h2>

                        <div className="space-y-4">
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-24 h-24 rounded-full bg-surface-highlight border-2 border-dashed border-white/20 flex items-center justify-center relative overflow-hidden group cursor-pointer hover:border-primary transition-colors">
                                    {user.image ? (
                                        <Image src={user.image} alt="Profile" fill className="object-cover" />
                                    ) : (
                                        <span className="text-2xl font-bold text-gray-400">{user.username?.[0].toUpperCase()}</span>
                                    )}
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-white">Upload</div>
                                </div>

                                <div className="flex-1 w-full space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Username</label>
                                            <input
                                                type="text"
                                                defaultValue={user.username || ""}
                                                className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg focus:border-primary outline-none transition-colors text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Display Name</label>
                                            <input
                                                type="text"
                                                defaultValue={user.name || ""}
                                                className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg focus:border-primary outline-none transition-colors text-white"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Bio</label>
                                        <textarea
                                            className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg focus:border-primary outline-none transition-colors text-white h-24 resize-none"
                                            placeholder="Tell the community about your collection..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Account Data */}
                    <section className="bg-surface border border-white/10 rounded-xl p-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-green-500" /> Account Security
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Email Address</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="email"
                                        value={user.email || ""}
                                        disabled
                                        className="w-full px-4 py-2 bg-black/30 border border-white/5 rounded-lg text-gray-400 cursor-not-allowed"
                                    />
                                    <span className="text-green-500 text-xs font-bold bg-green-500/10 px-2 py-1 rounded border border-green-500/20">VERIFIED</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                <div>
                                    <div className="font-bold text-sm">Change Password</div>
                                    <div className="text-xs text-gray-400">Update your account password regularly.</div>
                                </div>
                                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold border border-white/10 transition-colors">
                                    Update
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Save Button */}
                    <div className="flex justify-end pt-4">
                        <button className="flex items-center gap-2 px-8 py-3 bg-primary text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors shadow-lg shadow-primary/20">
                            <Save className="w-4 h-4" /> Save Changes
                        </button>
                    </div>

                </div>
            </div>
        </main>
    );
}
