import Button from "@/components/ui/button/button";
import { getPriceFormat } from "@/utils/get-price-format";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

type Props = {
  totalSumm: number;
  isCartNo: boolean;
};

export default function SummerySection({ totalSumm, isCartNo }: Props) {
  return (
    <View className="border-t border-gray-200 bg-white px-4 py-6">
      <View className="flex-row justify-between">
        <Text className="text-xl font-medium text-gray-900">Итог</Text>
        <Text className="text-xl font-medium text-gray-900">
          {getPriceFormat(totalSumm)}
        </Text>
      </View>
      <Text className="mt-0.5 text-gray-500">
        Доставка и налоги будут рассчитаны при оформлении заказа.
      </Text>
      {isCartNo ? (
        <Button
          onPress={() => router.push("/(tabs)/catalog/category")}
          className="mt-6"
          variant="big"
        >
          За покупками
        </Button>
      ) : (
        <Button
          onPress={() => router.push("/(modals)/checkout")}
          className="mt-6"
          variant="big"
        >
          Оформить заказ
        </Button>
      )}
      {isCartNo ? null : (
        <View className="flex-row items-center justify-center mt-6">
          <Text className=" text-gray-500">или </Text>

          <Pressable
            className="font-medium text-neutral-800 flex-row gap-1 items-center"
            onPress={() => router.push("/(tabs)/catalog/category")}
          >
            <Text>продолжить покупки </Text>
            <Feather name="arrow-right" size={15} color={"#6b7280"} />
          </Pressable>
        </View>
      )}
    </View>
  );
}
