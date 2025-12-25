import { STATUS_ORDER } from "@/types/order";
import { Text, View } from "react-native";
import StatusOrder from "../order-history/status-order";

type Props = {
  updatedAt?: string;
  statusOrder?: (typeof STATUS_ORDER)[keyof typeof STATUS_ORDER]["value"];
};

export default function FuterOrder({ statusOrder, updatedAt }: Props) {
  return (
    <View className="mt-6 p-4 border-t border-gray-200 flex-row justify-between">
      <StatusOrder statusOrder={statusOrder} />
      <Text>
        {new Date(updatedAt || 0).toLocaleString("ru-RU", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </Text>
    </View>
  );
}
