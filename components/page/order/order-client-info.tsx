import { Text, View } from "react-native";

type Props = {
  deliveryAddress?: string | null;
  phone?: string | null;
  email?: string | null;
  paymentMethod?: string | null;
  comment?: string | null;
};

export default function OrderClientInfo({
  deliveryAddress,
  phone,
  email,
  paymentMethod,
  comment,
}: Props) {
  return (
    <View className="mt-6 gap-4">
      <View className="gap-3">
        <Text className="font-medium">Адрес</Text>
        <Text className="text-gray-700">{deliveryAddress}</Text>
      </View>
      <View className="gap-3">
        <Text className="font-medium">Данные для доставки</Text>
        <View className="gap-1">
          <Text className="text-gray-700">{phone}</Text>
          <Text className="text-gray-700">{email}</Text>
          <Text className="text-gray-700">{paymentMethod}</Text>
        </View>
      </View>
      <View className="gap-3">
        <Text className="font-medium">Комментарий</Text>
        <Text className="text-gray-700">{comment}</Text>
      </View>
    </View>
  );
}
