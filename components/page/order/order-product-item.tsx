import ColorIcon from "@/components/layout/color-icon";
import { useImageSource } from "@/hooks/useImageSource";
import { ProductImage } from "@/types/products";
import { getPriceFormat } from "@/utils/get-price-format";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

type Props = {
  documentId: string;
  productVariantImg: ProductImage;
  index: number;
  productSlug: string;
  title: string;
  quantity: number;
  price: number;
  size?: string | null;
  colorHex?: string | null;
};
export default function OrderProductItem({
  documentId,
  price,
  productSlug,
  productVariantImg,
  index,
  title,
  quantity,
  size,
  colorHex,
}: Props) {
  const source = useImageSource(productVariantImg);
  return (
    <View
      style={{
        paddingTop: index === 0 ? 0 : 16,
        marginTop: index === 0 ? 0 : 16,
        borderTopColor: index === 0 ? "none" : "#e5e7eb",
        borderTopWidth: index === 0 ? 0 : 1,
      }}
      className="flex-row items-start"
    >
      <Image
        source={source}
        className="w-32 aspect-[4/5] shrink-0 overflow-hidden rounded-lg border border-gray-200"
      />
      <View className="ml-4 flex-1 justify-center">
        <Pressable
          onPress={() => router.push(`/(tabs)/catalog/product/${productSlug}`)}
          className="flex-row justify-between"
        >
          <View>
            <Text className="text-lg font-medium text-gray-900">{title}</Text>
            <Text className="flex flex-1 items-end justify-between text-sm text-gray-500">
              Шт. {quantity}
            </Text>
          </View>
          <View>
            <Text className="text-lg font-medium">
              {getPriceFormat(price * quantity)}
            </Text>
            <Text className="text-sm text-gray-500 ml-4">
              {getPriceFormat(price)}
            </Text>
          </View>
        </Pressable>
        <View className="mt-4 flex-1 justify-end gap-3">
          <ColorIcon color={colorHex || ""} />
          <Text>
            <Text className="text-gray-500">Размер:</Text> {size}
          </Text>
        </View>
      </View>
    </View>
  );
}
