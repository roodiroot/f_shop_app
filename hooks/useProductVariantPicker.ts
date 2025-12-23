import { useEffect, useMemo, useState } from "react";

type Variant = {
  documentId: string;
  colorHex?: string | null;
  size?: string | null;
  stock?: number | null;
  price?: number | null;
  images?: any[];
};

export function useProductVariantPicker(
  variants: Variant[] = [],
  onVariantChange?: (v: Variant | null) => void
) {
  const colors = useMemo(() => {
    return Array.from(
      new Set(variants.map((v) => v.colorHex || "").filter(Boolean))
    );
  }, [variants]);

  const variantsByColor = useMemo(() => {
    return colors.reduce((acc: Record<string, Variant[]>, color) => {
      acc[color] = variants.filter((v) => (v.colorHex || "") === color);
      return acc;
    }, {});
  }, [colors, variants]);

  const getFirstSelectableVariantForColor = (color: string) => {
    const list = variantsByColor[color] ?? [];
    const firstWithStock = list.find((v) => (v.stock || 0) > 0);
    return firstWithStock ?? list[0] ?? null;
  };

  const [selectedColor, setSelectedColor] = useState<string | null>(
    () => colors[0] ?? null
  );

  const [selectedSize, setSelectedSize] = useState<string | null>(() => {
    const c = colors[0];
    if (!c) return null;
    const v = getFirstSelectableVariantForColor(c);
    return (v?.size as string) ?? null;
  });

  const sizes = useMemo(() => {
    if (!selectedColor) return [];
    const list = variantsByColor[selectedColor] ?? [];
    return Array.from(new Set(list.map((v) => v.size || "").filter(Boolean)));
  }, [selectedColor, variantsByColor]);

  const currentVariant = useMemo(() => {
    if (!selectedColor || !selectedSize) return null;
    return (
      variants.find(
        (v) =>
          (v.colorHex || "") === selectedColor &&
          (v.size || "") === selectedSize
      ) ?? null
    );
  }, [variants, selectedColor, selectedSize]);

  useEffect(() => {
    onVariantChange?.(currentVariant);
  }, [currentVariant, onVariantChange]);

  const selectColor = (color: string) => {
    const list = variantsByColor[color] ?? [];
    const hasStock = list.some((v) => (v.stock || 0) > 0);
    if (!hasStock) return;

    setSelectedColor(color);

    const v = getFirstSelectableVariantForColor(color);
    setSelectedSize((v?.size as string) ?? null);
  };

  const selectSize = (size: string) => {
    if (!selectedColor) return;
    const v = (variantsByColor[selectedColor] ?? []).find(
      (x) => (x.size || "") === size
    );
    const disabled = (v?.stock || 0) <= 0;
    if (disabled) return;

    setSelectedSize(size);
  };

  return {
    colors,
    variantsByColor,
    sizes,
    selectedColor,
    selectedSize,
    currentVariant,
    selectColor,
    selectSize,
  };
}
