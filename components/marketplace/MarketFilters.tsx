"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useCallback } from "react";

export default function MarketFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set(name, value);
            } else {
                params.delete(name);
            }
            return params.toString();
        },
        [searchParams]
    );

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.push(`?${createQueryString("sort", e.target.value)}`);
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get("search")?.toString() || "";
        router.push(`?${createQueryString("q", query)}`);
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 items-center w-full mb-12">
            <form onSubmit={handleSearch} className="relative flex-1 group w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors w-5 h-5" />
                <input
                    name="search"
                    type="text"
                    defaultValue={searchParams.get("q") || ""}
                    placeholder="Search cards, sets, or attributes..."
                    className="w-full bg-surface border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 transition-all text-lg placeholder:text-gray-600"
                />
            </form>

            <div className="flex gap-4 w-full md:w-auto">
                <select
                    onChange={handleSortChange}
                    defaultValue={searchParams.get("sort") || "trending"}
                    className="flex-1 md:flex-none bg-surface border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary/50 appearance-none font-bold text-sm cursor-pointer hover:border-white/20 transition-colors bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%23666%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px] bg-[right_1.5rem_center] bg-no-repeat pr-12"
                >
                    <option value="trending">Sort by: Trending</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="newest">Newest Arrivals</option>
                </select>

                <button className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors font-bold text-sm">
                    All Rarities
                </button>
            </div>
        </div>
    );
}
