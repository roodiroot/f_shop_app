import FSHeader from "@/components/page/catalog/filters_sort/header";
import { Stack } from "expo-router";

export default function ModalLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="filters"
        options={{
          headerShown: true,
          header: () => <FSHeader />,
          title: "Фильтры",
        }}
      />
      <Stack.Screen
        name="order/[documentId]"
        options={{
          headerShown: false,
          title: "Заказ",
        }}
      />
      <Stack.Screen
        name="sort"
        options={{
          title: "Сортировка",
        }}
      />
      <Stack.Screen
        name="checkout"
        options={{
          title: "Оформление заказа",
        }}
      />
    </Stack>
  );
}
