import { getPriceFormat } from "@/utils/get-price-format";
import { Text, View } from "react-native";

type Props = {
  totalPrice: number;
  totalLength: number;
};
export default function OrderSammerySumm({ totalLength, totalPrice }: Props) {
  return (
    <View className="p-4 bg-gray-50 rounded-xl mt-6  gap-6">
      <View className="flex-row justify-between">
        <Text className="text-gray-800">Общая стоимость:</Text>
        <Text className="text-gray-900">{getPriceFormat(totalPrice)}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-gray-800">Колличество:</Text>
        <Text className="text-gray-900">{totalLength} Шт.</Text>
      </View>
      <View className="flex-row justify-between pt-4 border-t border-gray-300">
        <Text className="text-gray-800 text-lg">Итог:</Text>
        <Text className="text-gray-900 font-bold text-lg">
          {getPriceFormat(totalPrice)}
        </Text>
      </View>
    </View>
  );
}
