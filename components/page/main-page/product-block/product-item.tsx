// components/ProductCard.tsx
import Badge from "@/components/ui/badge";
import { useImageSource } from "@/hooks/useImageSource";
import { ProductImage, ProductVariant } from "@/types/products";
import { getPriceFormat } from "@/utils/get-price-format";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

type Props = {
  width: number;
  slug: string;
  title: string;
  hit?: boolean;
  sale?: number;
  image?: ProductImage;
  product_variants?: ProductVariant[];
};

export function ProductItem({
  width,
  slug,
  title,
  hit,
  sale,
  image,
  product_variants = [],
}: Props) {
  const source = useImageSource(image, "small");
  const minPrice = Math.min(...product_variants.map((v) => v?.price || 0));

  return (
    <Pressable
      style={{ width }}
      onPress={() => router.push(`/(tabs)/catalog/product/${slug}`)}
      className="aspect-[1/1.4] relative bg-gray-200 rounded-2xl overflow-hidden mb-2"
    >
      <LinearGradient
        colors={["#0B0B0B00", "#04040400", "#00000091"]}
        locations={[0, 0.64, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 10,
          padding: 16,
          alignItems: "flex-start",
          justifyContent: "flex-end",
        }}
      >
        <View>
          <Badge sale={sale} hit={hit} />
          <View className="mt-1.5">
            <Text className="text-lg/5 text-white">
              от {getPriceFormat(minPrice)}
            </Text>
            <Text className="text-lg/6 uppercase font-medium text-white">
              {title}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <Image source={source} className="w-full h-full" resizeMode="cover" />
    </Pressable>
  );
}
