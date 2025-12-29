import { View } from "react-native";

export default function SceletonCategory() {
  return (
    <View className="px-4 mt-4 gap-8">
      {new Array(4).fill("").map((_, index) => (
        <View
          key={index}
          className="w-full rounded-3xl bg-gray-100 aspect-[4/1.5]"
        />
      ))}
    </View>
  );
}
