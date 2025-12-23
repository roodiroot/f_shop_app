// hooks/useImageSource.ts
import type { ProductImage } from "@/types/products";
import { getImageUrl } from "@/utils/get-image-url";
import { useMemo } from "react";
import type { ImageSourcePropType } from "react-native";

export const NO_IMAGE = require("@/assets/images/no-image.jpg");

export function useImageSource(
  image?: ProductImage | null,
  variant: "small" | "medium" | "large" = "small"
): ImageSourcePropType {
  const uri = useMemo(() => getImageUrl(image, variant), [image, variant]);

  const source = useMemo<ImageSourcePropType>(() => {
    return uri ? { uri } : NO_IMAGE;
  }, [uri]);

  return source;
}
