import { Variant } from "@/hooks/useProductVariantPicker";
import { Text, View } from "react-native";
import ColorItem from "./color-item";

type Props = {
  title: string;
  colors: string[];
  variantsByColor: Record<string, Variant[]>;
  selectedColor: string | null;
  selectColor: (value: string) => void;
};

export default function ChangeColor({
  title,
  colors,
  variantsByColor,
  selectedColor,
  selectColor,
}: Props) {
  return (
    <View>
      <Text className="font-medium text-gray-900">{title}</Text>
      <View className="flex-row mt-4 items-center gap-3">
        {colors.map((color) => (
          <ColorItem
            key={color}
            color={color}
            variantsByColor={variantsByColor}
            selectColor={selectColor}
            selectedColor={selectedColor}
          />
        ))}
      </View>
    </View>
  );
}
