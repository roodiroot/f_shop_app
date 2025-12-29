import { Variant } from "@/hooks/useProductVariantPicker";
import { Pressable, Text, View } from "react-native";

type Props = {
  size: string;
  selectedColor: string | null;
  selectedSize: string | null;
  variantsByColor: Record<string, Variant[]>;
  selectSize: (value: string) => void;
};

export default function SizeItem({
  size,
  selectedColor,
  selectedSize,
  variantsByColor,
  selectSize,
}: Props) {
  const v = selectedColor
    ? (variantsByColor[selectedColor] ?? []).find(
        (x) => (x.size || "") === size
      )
    : null;

  const isDisabled = (v?.stock || 0) <= 0;
  const isSelected = size === selectedSize;

  return (
    <View
      key={size}
      className="w-1/4 items-center flex-row justify-center p-1.5"
    >
      <Pressable
        onPress={() => selectSize(size)}
        disabled={isDisabled}
        className={[
          "flex-1 items-center justify-center rounded-xl border bg-white py-5",
          isSelected ? "border-gray-900 border-2" : "border-gray-300",
          isDisabled ? "opacity-40" : "",
        ].join(" ")}
      >
        <Text className="text-gray-900 font-medium">{size}</Text>
      </Pressable>
    </View>
  );
}
