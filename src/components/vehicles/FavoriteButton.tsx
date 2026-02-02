'use client';

import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';

interface FavoriteButtonProps {
    vehicleId: string;
    className?: string;
}

export default function FavoriteButton({ vehicleId, className }: FavoriteButtonProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const active = isFavorite(vehicleId);

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(vehicleId);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-sm border ${active
                    ? "bg-red-500 border-red-400 text-white"
                    : "bg-white/50 border-white/20 text-gray-700 hover:bg-white/80"
                } ${className || ''}`}
            title={active ? "Remove from Favorites" : "Add to Favorites"}
        >
            <Heart
                className={`w-5 h-5 ${active ? "fill-current" : ""}`}
            />
        </button>
    );
}
