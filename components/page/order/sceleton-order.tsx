import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SkeletonOrder() {
  const insets = useSafeAreaInsets();
  return (
    <View className="px-4 bg-gray-50">
      <View style={{ paddingTop: insets.top }}>
        <View
          className="w-full rounded-lg bg-gray-100 animate-pulse"
          style={{ height: 56.3 }}
        ></View>
        <View className="h-[600] rounded-lg bg-gray-100 animate-pulse mt-4"></View>
      </View>
    </View>
  );
}
