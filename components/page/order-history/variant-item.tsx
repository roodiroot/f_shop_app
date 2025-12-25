import { useImageSource } from "@/hooks/useImageSource";
import { ProductImage } from "@/types/products";
import { getPriceFormat } from "@/utils/get-price-format";

import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

type Props = {
  index: number;
  slug: string;
  title: string;
  productVariantPrice: number;
  quantity: number;
  image?: ProductImage;
};

export default function VariantItem({
  index,
  slug,
  title,
  productVariantPrice,
  quantity,
  image,
}: Props) {
  const source = useImageSource(image);
  return (
    <View
      style={{
        borderTopWidth: index === 0 ? 0 : 1,
        borderColor: "#e5e7eb",
      }}
      className="py-4"
    >
      <View className="flex-row items-center">
        <Image
          source={source}
          className="w-40 aspect-[4/5] shrink-0 overflow-hidden rounded-lg border border-gray-200"
        />
        <View className="ml-4 flex-1 justify-center">
          <View>
            <Pressable
              onPress={() => router.push(`/(tabs)/catalog/product/${slug}`)}
              className="flex-row justify-between"
            >
              <Text className="text-lg font-medium text-gray-900">{title}</Text>
              <Text className="text-lg font-medium text-gray-900 ml-4">
                {getPriceFormat(productVariantPrice)}
              </Text>
            </Pressable>
            <Text className="flex flex-1 items-end justify-between text-sm text-gray-500">
              Шт. {quantity}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
