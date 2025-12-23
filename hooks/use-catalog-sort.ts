import { create } from "zustand";

export const SORT_TYPES = {
  CREATED_DESC: {
    name: "По умолчанию",
    value: "createdAt:desc",
  },
  PRICE_DESC: {
    name: "Сначала дороже",
    value: "product_variants.price:desc",
  },
  PRICE_ASC: {
    name: "Сначала дешевле",
    value: "product_variants.price:asc",
  },
  NAME_ASC: {
    name: "По алфавиту",
    value: "shortName:asc",
  },
} as const;

export type SortType = (typeof SORT_TYPES)[keyof typeof SORT_TYPES]["value"];

type State = {
  sortType: SortType;
  setSortType: (sortType: SortType) => void;
  resetSort: () => void;
};

export const useCatalogSort = create<State>((set) => ({
  sortType: "createdAt:desc",

  setSortType: (sortType) =>
    set({
      sortType,
    }),

  resetSort: () =>
    set({
      sortType: "createdAt:desc",
    }),
}));
