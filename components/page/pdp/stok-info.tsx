import cn from "clsx";
import { Text, View } from "react-native";

type StockInfoProps = {
  stock?: number | null;
  className?: string;
};

export default function StockInfo({ stock = 0, className }: StockInfoProps) {
  if (!stock || stock < 0) {
    return (
      <View className={cn(className, "text-sm text-red-500 font-medium")}>
        <Text>Товар закончился</Text>
      </View>
    );
  }
  return (
    <View className={cn(className, "text-sm text-gray-900 font-medium")}>
      <Text>{stock < 3 && stock > 0 ? "Осталось мало" : null}</Text>
    </View>
  );
}
