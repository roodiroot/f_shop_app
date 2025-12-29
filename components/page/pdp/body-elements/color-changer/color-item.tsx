import { Variant } from "@/hooks/useProductVariantPicker";
import cn from "clsx";
import { Pressable, View } from "react-native";

type Props = {
  variantsByColor: Record<string, Variant[]>;
  color: string;
  selectedColor: string | null;
  selectColor: (value: string) => void;
};

export default function ColorItem({
  variantsByColor,
  color,
  selectedColor,
  selectColor,
}: Props) {
  const list = variantsByColor[color] ?? [];
  const colorHasStock = list.some((v) => (v.stock || 0) > 0);
  const isSelected = color === selectedColor;

  return (
    <Pressable
      key={color}
      onPress={() => selectColor(color)}
      disabled={!colorHasStock}
      className={cn(
        "bg-white size-12 justify-center items-center rounded-full border-2",
        isSelected ? "border-gray-900" : "border-gray-300",
        !colorHasStock ? "opacity-40" : ""
      )}
    >
      <View
        className="rounded-full size-10 opacity-40"
        style={{ backgroundColor: color }}
      />
    </Pressable>
  );
}
