import { View } from "react-native";

export default function SkeletonOrderHisory() {
  return (
    <View className="gap-8 pt-4">
      {new Array(2).fill("").map((_, index) => (
        <View
          key={index}
          className="rounded-lg animate-pulse bg-gray-100"
          style={{ height: 315 }}
        />
      ))}
    </View>
  );
}
