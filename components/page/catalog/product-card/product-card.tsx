// components/ProductCard.tsx
import { useImageSource } from "@/hooks/useImageSource";
import { ProductImage } from "@/types/products";
import { getPriceFormat } from "@/utils/get-price-format";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

type Props = {
  slug: string;
  title: string;
  image?: ProductImage;
  product_variants?: any[];

  // product?: ProductAttributes;
};

export function ProductCard({
  slug,
  title,
  image,
  product_variants = [],

  // product,
}: Props) {
  const source = useImageSource(image, "small");
  const minPrice = Math.min(...product_variants.map((v) => v?.price || 0));

  return (
    <Pressable
      onPress={() => router.push(`/(tabs)/catalog/product/${slug}`)}
      className="flex-1"
    >
      <Image
        source={source}
        className="w-full h-80 rounded-xl overflow-hidden"
        resizeMode="cover"
      />

      <View className="mt-4 gap-1">
        <Text numberOfLines={2} className="text-base text-gray-700">
          {title}
        </Text>

        <Text className="text-lg font-medium text-gray-900">
          от {getPriceFormat(minPrice)}
        </Text>

        {/* ================================== */}
        {/* <Text className="text-gray-500">
          composition{" "}
          <Text className="text-gray-900 font-medium">
            {product?.composition}
          </Text>
        </Text>
        <Text className="text-gray-500">
          gender{" "}
          <Text className="text-gray-900 font-medium">{product?.gender}</Text>
        </Text>
        <Text className="text-gray-500">
          rise{" "}
          <Text className="text-gray-900 font-medium">{product?.rise}</Text>
        </Text>
        <Text className="text-gray-500">
          season{" "}
          <Text className="text-gray-900 font-medium">{product?.season}</Text>
        </Text>
        <Text className="text-gray-500">
          seasonality{" "}
          <Text className="text-gray-900 font-medium">
            {product?.seasonality}
          </Text>
        </Text> */}
        {/* ================================== */}
      </View>
    </Pressable>
  );
}
