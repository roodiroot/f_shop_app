import { View } from "react-native";

type Props = {
  itemWidth: number;
};

export default function SkeletonCard({ itemWidth }: Props) {
  return (
    <View style={{ width: itemWidth }} className="mb-6">
      <View className="w-full h-80 rounded-xl bg-gray-100 animate-pulse" />
      <View className="mt-4 gap-1">
        <View className="w-full h-4 bg-gray-100 rounded animate-pulse" />
        <View className="w-1/2 h-5 bg-gray-100 rounded animate-pulse" />
      </View>
    </View>
  );
}
