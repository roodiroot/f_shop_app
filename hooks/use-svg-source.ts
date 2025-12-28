import { getImageUrl } from "@/utils/get-image-url";
import { useMemo } from "react";

export function useSVGSource(image?: string | null): string | null {
  return useMemo(() => {
    if (!image) return null;

    const uri = getImageUrl(image);

    if (!uri) return null;

    if (!uri.toLowerCase().endsWith(".svg")) {
      return null;
    }

    return uri;
  }, [image]);
}
