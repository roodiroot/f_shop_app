import { getPriceFormat } from "@/utils/get-price-format";
import { Text, View } from "react-native";

type Props = {
  title: string;
  price: number;
};

export default function TitleEndPrice({ title, price }: Props) {
  return (
    <View>
      <Text className="text-3xl font-bold tracking-tight text-gray-900">
        {title}
      </Text>
      <Text className="mt-4 text-3xl">{getPriceFormat(price)}</Text>
    </View>
  );
}
