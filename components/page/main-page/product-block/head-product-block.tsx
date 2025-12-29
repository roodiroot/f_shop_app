import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

type Props = {
  title?: string;
  funcButton?: () => void;
};

export default function HeadProductBlock({
  title = "Вам понравиться",
  funcButton = () => router.push("/(tabs)/catalog/category"),
}: Props) {
  return (
    <View className="flex-row justify-between items-center text-gray-50">
      <Text className="text-2xl text-gray-900 font-bold tracking-tight">
        {title}
      </Text>
      <Pressable onPress={funcButton}>
        <Text className="text-gray-900 tracking-tight">В каталог</Text>
      </Pressable>
    </View>
  );
}
