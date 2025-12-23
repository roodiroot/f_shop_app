import { FilterId } from "@/utils/prepare-filters";
import { create } from "zustand";

export type SelectedFilters = Partial<Record<FilterId, string[]>>;

type State = {
  applied: SelectedFilters;
  setApplied: (next: SelectedFilters) => void;
  resetById: (id: FilterId) => void;
  reset: () => void;
};

export const useCatalogFilters = create<State>((set) => ({
  applied: {},
  setApplied: (next) => set({ applied: next }),
  resetById: (id: FilterId) =>
    set((state) => {
      const next = { ...state.applied };
      delete next[id];
      return { applied: next };
    }),
  reset: () => set({ applied: {} }),
}));
