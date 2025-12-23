import { ProductImage, ShortProductType } from "./products";

export interface Order {
  documentId: string;
  deliveryAddress?: string | null;
  comment?: string | null;
  email: string;
  totalPrice: number;
  statusOrder: "waiting_for_payment" | "paid" | "shipped" | "canceled";
  phone: string;
  paymentMethod: string;
  paymentId?: string | null;
  createdAt: string;
  updatedAt: string;
  order_items: OrderItem[];
}

export interface OrderItem {
  documentId: string;
  title: string;
  sku: string;
  quantity: number;
  product_variant: ProductVariant;
  product: Omit<
    ShortProductType,
    "documentId" | "shortName" | "product_variants"
  >;
}

export interface ProductVariant {
  size: string | null;
  price: number;
  colorHex: string | null;
  images: ProductImage[];
}
