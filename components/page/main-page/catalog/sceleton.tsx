import { View } from "react-native";

export default function Sceleton() {
  return (
    <View
      style={{ aspectRatio: 1 / 1.3 }}
      className="w-[110] bg-gray-100 rounded-xl overflow-hidden animate-pulse"
    />
  );
}
