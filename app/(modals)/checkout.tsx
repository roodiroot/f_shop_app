import OrderCreateForm from "@/components/form/order-form";
import WrapperList from "@/components/ui/wrapper-list";
import { Text } from "react-native";

export default function CheckoutModalPage() {
  return (
    <WrapperList className="px-2 pt-4">
      <Text className="text-lg font-medium mb-6">Контактная информация</Text>
      <OrderCreateForm />
    </WrapperList>
  );
}
