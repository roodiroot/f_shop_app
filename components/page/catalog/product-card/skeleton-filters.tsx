import { View } from "react-native";

export default function SkeletonFilters() {
  return (
    <View style={{ height: 30 }} className="flex-row justify-between">
      <View className="flex-1 h-full rounded-xl bg-gray-100 animate-pulse" />
    </View>
  );
}
