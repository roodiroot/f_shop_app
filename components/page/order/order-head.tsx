import { toast } from "@/utils/toast";
import * as Clipboard from "expo-clipboard";
import { Pressable, Text, View } from "react-native";

type Props = {
  createdAt: string;
  documentId: string;
};

export default function OrderHead({ createdAt, documentId }: Props) {
  const handleCopy = async () => {
    await Clipboard.setStringAsync(documentId);
    toast.info("id заказа скопирован");
  };

  return (
    <View className="flex-row justify-between pt-4 overflow-hidden">
      <View>
        <Text className="text-2xl/9 font-bold tracking-tight text-gray-900">
          Заказ #
        </Text>
        <Pressable onPress={() => handleCopy()}>
          <Text className="text-lg text-gray-600">
            {documentId.slice(0, 10)}
          </Text>
        </Pressable>
      </View>
      <View className="justify-end">
        <Text className="text-lg text-gray-800 font-medium">
          {new Date(createdAt).toLocaleString("ru-RU", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          })}
        </Text>
      </View>
    </View>
  );
}
