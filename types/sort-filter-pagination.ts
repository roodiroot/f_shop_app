export type SortParams = string[];

export interface ProductFilters {
  [key: string]: any;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}
