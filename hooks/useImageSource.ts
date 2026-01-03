// hooks/useImageSource.ts
import type { ProductImage } from "@/types/products";
import { getImageUrl } from "@/utils/get-image-url";
import type { ImageSourcePropType } from "react-native";

export const NO_IMAGE = require("@/assets/images/no-image.jpg");

export function useImageSource(
  image?: ProductImage | null | string,
  variant: "small" | "medium" | "large" = "small"
): ImageSourcePropType {
  const uri = getImageUrl(image, variant);
  return uri ? { uri } : NO_IMAGE;
}
