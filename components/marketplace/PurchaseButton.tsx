"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Wallet } from "lucide-react";
import PurchaseModal from "./PurchaseModal";

interface PurchaseButtonProps {
    cardId: string;
    name: string;
    price: string;
    imageUrl: string;
    set: string;
}

export default function PurchaseButton({ cardId, name, price, imageUrl, set }: PurchaseButtonProps) {
    const { status } = useSession();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        if (status !== "authenticated") {
            alert("Please login to purchase items.");
            return;
        }
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="w-full">
                <button
                    onClick={handleOpenModal}
                    className="w-full flex items-center justify-center gap-2 bg-white text-black font-bold py-4 px-8 rounded-lg hover:bg-gray-200 transition-all transform active:scale-[0.98] shadow-lg shadow-white/10"
                >
                    <Wallet className="w-5 h-5" /> Buy Now for {price}
                </button>
            </div>

            <PurchaseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                card={{
                    id: cardId,
                    name,
                    price,
                    imageUrl,
                    set
                }}
            />
        </>
    );
}
