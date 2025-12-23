import { ShortProductType } from "./products";

export type CategoryRootType = {
  slug: string;
  name: string;
  documentId: string;
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
