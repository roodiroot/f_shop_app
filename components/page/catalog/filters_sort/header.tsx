import { Platform, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FSHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingTop: Platform.OS === "ios" ? 16 : insets.top }}
      className="bg-white border-b border-gray-200 pb-4 items-center"
    >
      <Text className="text-gray-800 font-medium text-xl">Фильтры</Text>
    </View>
  );
}
