import { ProductImage, ShortProductType } from "./products";

export const STATUS_ORDER = {
  WAITING_FOR_PAYMENT: {
    value: "waiting_for_payment",
    name: "Ожидает оплаты",
    iconFeather: "dollar-sign",
    iconColor: "#22c55e",
  },
  PAID: {
    value: "paid",
    name: "Оплачен",
    iconFeather: "check-circle",
    iconColor: "#22c55e",
  },
  SHIPPED: {
    value: "shipped",
    name: "Отправлен",
    iconFeather: "truck",
    iconColor: "#22c55e",
  },
  CANCELED: {
    value: "canceled",
    name: "Отменен",
    iconFeather: "alert-circle",
    iconColor: "#e11d48",
  },
} as const;

export interface Order {
  documentId: string;
  deliveryAddress?: string | null;
  comment?: string | null;
  email: string;
  totalPrice: number;
  statusOrder: (typeof STATUS_ORDER)[keyof typeof STATUS_ORDER]["value"];
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
