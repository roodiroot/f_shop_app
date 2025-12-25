import { Text, View } from "react-native";

type Props = {
  createdAt: string;
  documentId: string;
};

export default function OrderHead({ createdAt, documentId }: Props) {
  return (
    <View className="flex-row justify-between pt-4">
      <View>
        <Text className="text-2xl/9 font-bold tracking-tight text-gray-900">
          Заказ
        </Text>
        <Text className="text-lg text-gray-600">{documentId}</Text>
      </View>
      <View className="justify-end">
        <Text className="text-lg text-gray-800 font-medium">
          {new Date(createdAt).toLocaleString("ru-RU", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </Text>
      </View>
    </View>
  );
}
