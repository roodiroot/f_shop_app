import FSHeader from "@/components/page/catalog/filters_sort/header";
import { Stack } from "expo-router";

export default function RootLayout() {
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
        name="sort"
        options={{
          title: "Сортировка",
        }}
      />
    </Stack>
  );
}
