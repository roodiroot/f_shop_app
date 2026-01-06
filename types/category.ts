import {
  ProductImage,
  ProductImageFormats,
  ShortProductType,
} from "./products";

export type CategoryBase = {
  slug: string;
  name: string;
  documentId: string;
  image: ProductImage;
};

export type CategoryScreen = CategoryBase & {
  icon: Pick<ProductImageFormats, "url">;
};

export type ChildrenCategory = {
  slug: string;
  name: string;
  documentId: string;
  icon: Pick<ProductImageFormats, "url">;
  // image: ProductImage;
  products: [] | ShortProductType[];
};

export type CategoryRootType = CategoryBase & {
  products: ShortProductType[] | [];
  children: ChildrenCategory[];
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
