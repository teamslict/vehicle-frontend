import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FavoritesState {
    favorites: string[];
    toggleFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: [],
            toggleFavorite: (id) => {
                const { favorites } = get();
                const isFav = favorites.includes(id);
                const newFavorites = isFav
                    ? favorites.filter((favId) => favId !== id)
                    : [...favorites, id];

                set({ favorites: newFavorites });
            },
            isFavorite: (id) => {
                return get().favorites.includes(id);
            },
        }),
        {
            name: 'v_favorites', // name of the item in the storage (must match FAVORITES_KEY)
            storage: createJSONStorage(() => localStorage),
        }
    )
);
