import { ProductImageFormats, ShortProductType } from "./products";

export type CategoryBase = {
  slug: string;
  name: string;
  documentId: string;
};

export type CategoryScreen = CategoryBase & {
  icon: Pick<ProductImageFormats, "url">;
  image: ProductImageFormats;
};

export type CategoryRootType = CategoryBase & {
  products: ShortProductType[] | [];
  children: {
    slug: string;
    name: string;
    documentId: string;
    products: ShortProductType[] | [];
  }[];
};

export type TypeShort = {
  documentId: string;
  name: string;
  slug: string;
  children: TypeShort[];
};

export type CategoryDocumentIdType = {
  categories: TypeShort[];
};

export interface ShortCategoryType {
  name: string;
  slug: string;
  parent: ShortCategoryType;
}
