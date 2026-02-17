"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Wallet } from "lucide-react";
import PurchaseModal from "./PurchaseModal";

interface PurchaseButtonProps {
    listingId: string;
    cardId: string;
    name: string;
    price: string;
    imageUrl: string;
    set: string;
}

export default function PurchaseButton({ listingId, cardId, name, price, imageUrl, set }: PurchaseButtonProps) {
    const { status } = useSession();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        if (status !== "authenticated") {
            // TODO: Replace with a proper toast notification
            alert("Por favor inicia sesión para comprar artículos.");
            return;
        }
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="w-full">
                <button
                    onClick={handleOpenModal}
                    className="w-full flex items-center justify-center gap-3 bg-white text-black font-black uppercase tracking-widest text-sm py-4 px-8 rounded-2xl hover:bg-primary hover:text-nexus transition-all duration-300 transform active:scale-[0.98] shadow-xl shadow-white/5 group"
                >
                    <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                        alt=""
                        className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500"
                    />
                    Comprar por {price}
                </button>
            </div>

            <PurchaseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                listingId={listingId}
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
