import { Filters } from "@/types/filters";

export type FilterId =
  | "color"
  | "topBottom"
  | "gender"
  | "rise"
  | "season"
  | "seasonality"
  | "composition"
  | "denomination"
  | "categoryParam";

export const map: Record<FilterId, string> = {
  gender: "Пол",
  color: "Цвет",
  topBottom: "Тип одежды",
  rise: "Посадка",
  season: "Сезон",
  seasonality: "Сезонность",
  composition: "Состав",
  denomination: "Номинал",
  categoryParam: "Категории",
};

const isFilterId = (k: string): k is FilterId => k in map;

export function prepareFilters(filters?: Filters) {
  if (!filters) return;

  const sections = Object.entries(filters)
    .filter(([_, value]) => Array.isArray(value))
    .map(([key, value]) => ({
      id: key,
      name: isFilterId(key) ? map[key] : key,
      items: value as string[],
    }))
    .filter((section) => section.items.length > 0);

  // if (
  //   typeof filters.minPrice === "number" &&
  //   typeof filters.maxPrice === "number"
  // ) {
  //   sections.push({
  //     id: "price",
  //     name: "Цена",
  //     items: [filters.minPrice, filters.maxPrice],
  //   });
  // }

  return sections.filter((value) => value.items.length > 1);
}

export const prepareActiveFilters = (
  value?: Partial<Record<FilterId, string[]>>
) => {
  if (!value) return [];
  return Object.keys(value)
    .filter(isFilterId)
    .map((i) => {
      return { id: i, name: map[i] };
    });
};
