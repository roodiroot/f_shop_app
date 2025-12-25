import { shadowSoft } from "@/theme/colors";
import { OrderItem, STATUS_ORDER } from "@/types/order";
import { getPriceFormat } from "@/utils/get-price-format";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import StatusOrder from "./status-order";
import VariantItem from "./variant-item";

type Props = {
  documentId: string;
  totalPrice: number;
  statusOrder: (typeof STATUS_ORDER)[keyof typeof STATUS_ORDER]["value"];
  updatedAt: string;
  order_items: OrderItem[];
};

export default function OrderItemComponent({
  documentId,
  totalPrice,
  statusOrder,
  updatedAt,
  order_items,
}: Props) {
  return (
    <View
      style={shadowSoft}
      className="border border-gray-200 rounded-xl bg-white"
    >
      <Pressable
        onPress={() => router.push(`/(tabs)/profile/order/${documentId}`)}
        className="flex-row items-center justify-between border-b border-gray-200 p-4"
      >
        <View className="gap-1">
          <Text className="font-medium text-gray-900">Сумма заказа</Text>
          <Text className="font-medium text-gray-900">
            {getPriceFormat(totalPrice)}
          </Text>
        </View>
        <View className="gap-1 items-end">
          <StatusOrder statusOrder={statusOrder} />
          <Text className="font-medium text-gray-900">
            {new Date(updatedAt).toLocaleString("ru-RU", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Text>
        </View>
      </Pressable>
      <View className="px-4 pb-4">
        {order_items.map((i, index) => (
          <VariantItem
            key={i.documentId}
            index={index}
            title={i.title}
            quantity={i.quantity}
            slug={i.product.slug}
            image={i.product_variant.images[0]}
            productVariantPrice={i.product_variant.price}
          />
        ))}
        <View className="border-t border-gray-200 pt-4 flex-row">
          <Pressable
            className="flex-1 pr-4 border-r  border-gray-200"
            onPress={() => router.push(`/(tabs)/profile/order/${documentId}`)}
          >
            <Text className="text-center">Подробнее</Text>
          </Pressable>
          <Pressable className=" pl-4 flex-1">
            <Text className="text-center">Повторить</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
