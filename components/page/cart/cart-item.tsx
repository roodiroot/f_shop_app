import { Feather } from "@expo/vector-icons";
import cn from "clsx";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

import { useImageSource } from "@/hooks/useImageSource";
import { getPriceFormat } from "@/utils/get-price-format";
import ChangeQuantityCounter from "./change-quantity-counter";

import ColorIcon from "@/components/layout/color-icon";
import { ProductImage } from "@/types/products";

type CartItemProps = {
  variantId: string;
  index: number;
  slug: string;
  name: string;
  imageUrl: ProductImage;
  price: number;
  quantity: number;
  stock: number;
  color?: string;
  size?: string;
  updateItemQuantity: (variantId: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
};

export default function CartItem({
  variantId,
  slug,
  name,
  quantity,
  price,
  stock,
  imageUrl,
  color,
  size,
  removeFromCart,
  updateItemQuantity,
  index,
}: CartItemProps) {
  const source = useImageSource(imageUrl, "small");
  return (
    <View
      className={cn("py-6 flex-row", index !== 0 && "border-t border-gray-200")}
    >
      <View className="w-24 aspect-[4/5] shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image source={source} className="size-full object-cover" />
      </View>
      <View className="ml-4 flex flex-1 flex-col">
        <View>
          <View className="flex-row justify-between">
            <View className="flex-row gap-3 items-center">
              <Pressable
                onPress={() => router.push(`/(tabs)/catalog/product/${slug}`)}
              >
                <Text className="text-xl font-medium text-gray-900">
                  {name}
                </Text>
              </Pressable>
            </View>
            <Text className="text-lg font-medium text-gray-900">
              {getPriceFormat(price * quantity)}
            </Text>
          </View>
          <View className="flex-row items-end mt-2">
            <ColorIcon color={color || ""} />
            <Text className="mt-1 ml-3 text-base text-gray-500">
              Размер: {size}
            </Text>
          </View>
        </View>

        <View className="flex-1 flex-row items-end justify-between">
          <View>
            <ChangeQuantityCounter
              variantId={variantId}
              quantity={quantity}
              stock={stock}
              updateItemQuantity={updateItemQuantity}
            />
          </View>
          <Pressable
            onPress={() => {
              removeFromCart(variantId);
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning
              );
            }}
          >
            <Feather name="trash-2" color={"#6b7280"} size={20} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
