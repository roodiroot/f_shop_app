import cn from "clsx";
import { View } from "react-native";

export default function ColorIcon({ color }: { color: string }) {
  return (
    <View
      className={cn(
        "bg-white size-8 justify-center items-center rounded-full border border-gray-300"
      )}
    >
      <View
        className="rounded-full size-6 opacity-40"
        style={{ backgroundColor: color }}
      />
    </View>
  );
}
