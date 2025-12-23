import { ProductImage } from "@/types/products";

export function getImageUrl(
  image?: ProductImage | null,
  variant?: "small" | "medium" | "large"
) {
  const base = process.env.EXPO_PUBLIC_API_URL || "";
  if (!image) {
    return null;
  }
  const formats = image?.formats;

  let url;

  if (variant === "large") {
    url =
      formats?.large?.url ??
      formats?.medium?.url ??
      formats?.small?.url ??
      null;
  }
  if (variant === "medium") {
    url =
      formats?.medium?.url ??
      formats?.small?.url ??
      formats?.large?.url ??
      null;
  }
  if (!variant || variant === "small") {
    url =
      formats?.small?.url ??
      formats?.medium?.url ??
      formats?.large?.url ??
      null;
  }

  return url ? base + url : null;
}
