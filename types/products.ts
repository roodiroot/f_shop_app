import { ShortCategoryType } from "./category";

export interface ProductVariant {
  documentId: string;
  price?: number;
  size?: string;
  color?: string;
  colorHex?: string;
  stock?: number;
  images?: ProductImage[];
}

export interface ShortProductType {
  slug: string;
  documentId: string;
  shortName: string;
  product_variants: ProductVariant[];
}

export interface ProductAttributes extends ShortProductType {
  subcategory?: string;
  vendor?: string;
  categoryParam?: string;

  // =========================
  // composition?: string;
  // gender?: string;
  // rise?: string;
  // season?: string;
  // seasonality?: string;
}

export interface Product extends ProductAttributes {
  sku?: string;
  description?: string;
  manufaktura?: string;
  composition?: string;
  denomination?: string;
  fitBottom?: string;
  topBottom?: string;
  rise?: string;
  waist?: string;
  gender?: string;
  season?: string;
  seasonality?: string;
  categories: ShortCategoryType[];
}

export interface ProductConnection {
  nodes: ProductAttributes[];
  pageInfo: PageInfo;
}

export interface ProductsQueryResponse {
  products_connection: ProductConnection;
}

export interface ProductResponce {
  product: Product;
}

export interface PageInfo {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}

export interface ProductImageFormats {
  thumbnail?: { url: string };
  small?: { url: string };
  medium?: { url: string };
  large?: { url: string };
  url?: string;
}

export interface ProductImage {
  formats: ProductImageFormats;
}
