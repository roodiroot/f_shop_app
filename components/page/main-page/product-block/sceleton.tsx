import { View } from "react-native";

export default function Sceleton({ width }: { width: number }) {
  return (
    <View
      style={{ width }}
      className="bg-gray-100 animate-pulse rounded-2xl h-80"
    />
  );
}
