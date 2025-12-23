import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { ProductImage } from "@/types/products";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type CartItem = {
  slug: string;
  imageUrl: ProductImage;
  name: string;
  quantity: number;
  price: number;
  size: string;
  variantId: string;
  color: string;
  stock: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateItemQuantity: (variantId: string, quantity: number) => void;
  removeFromCart: (variantId: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (newItem) => {
        const items = get().items;

        const existing = items.find((i) => i.variantId === newItem.variantId);

        if (existing) {
          const updated = items.map((i) =>
            i.name === newItem.name
              ? { ...i, quantity: i.quantity + newItem.quantity }
              : i
          );
          set({ items: updated });
        } else {
          set({ items: [...items, newItem] });
        }
      },

      updateItemQuantity: (variantId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.variantId === variantId ? { ...item, quantity } : item
          ),
        }));
      },

      removeFromCart: (variantId) =>
        set({
          items: get().items.filter((i) => i.variantId !== variantId),
        }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    }
  )
);
