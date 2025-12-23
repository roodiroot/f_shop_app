export interface Filters {
  gender: string[];
  color: string[];
  topBottom: string[];
  rise: string[];
  season: string[];
  seasonality: string[];
  composition: string[];
  denomination: string[];
  categoryParam: string[];
  minPrice: number;
  maxPrice: number;
}

export interface FiltersResponse {
  filters: Filters;
}
