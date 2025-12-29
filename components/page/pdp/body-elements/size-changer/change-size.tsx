import { Variant } from "@/hooks/useProductVariantPicker";
import { Text, View } from "react-native";
import SizeItem from "./size-item";

type Props = {
  title: string;
  sizes: string[];
  selectedColor: string | null;
  selectedSize: string | null;
  variantsByColor: Record<string, Variant[]>;
  selectSize: (value: string) => void;
};

export default function ChangeSize({
  title,
  sizes,
  selectedColor,
  variantsByColor,
  selectedSize,
  selectSize,
}: Props) {
  return (
    <View className="relative mt-6">
      <View className="flex-row flex-1 justify-between">
        <Text className="font-medium text-gray-900">{title}</Text>
        <Text className="font-medium text-gray-900">Гайд по размерам</Text>
      </View>
      <View className="flex-row mt-4 -mx-1.5 flex-wrap">
        {sizes.map((size) => (
          <SizeItem
            key={size}
            size={size}
            selectedColor={selectedColor}
            selectSize={selectSize}
            variantsByColor={variantsByColor}
            selectedSize={selectedSize}
          />
        ))}
      </View>
    </View>
  );
}
