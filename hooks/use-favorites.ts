import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import AsyncStorage from "@react-native-async-storage/async-storage";

type FavoritesState = {
  items: string[];
  addToFavotite: (item: string) => void;
  removeFromFavorite: (item: string) => void;
};

export const useFavorite = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],

      addToFavotite: (newItem) => {
        const items = get().items;
        const existing = items.find((i) => i === newItem);
        if (existing) {
          set({ items });
        } else {
          set({ items: [...items, newItem] });
        }
      },

      removeFromFavorite: (id) =>
        set({
          items: get().items.filter((i) => i !== id),
        }),
    }),
    {
      name: "favorite-storage",
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    }
  )
);
