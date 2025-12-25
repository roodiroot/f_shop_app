import { STATUS_ORDER } from "@/types/order";
import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

type Props = {
  statusOrder?: (typeof STATUS_ORDER)[keyof typeof STATUS_ORDER]["value"];
};
export default function StatusOrder({ statusOrder }: Props) {
  const status = Object.values(STATUS_ORDER).find(
    (item) => item.value === statusOrder
  );

  return (
    <View className="flex-row items-center gap-2">
      <Feather name={status?.iconFeather} color={status?.iconColor} size={16} />
      <Text className="text-gray-500">{status?.name}</Text>
    </View>
  );
}
