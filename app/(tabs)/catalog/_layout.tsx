import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack
      initialRouteName="category/index"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="category/index" />
      <Stack.Screen name="search" />
      <Stack.Screen name="product/[slug]" />
    </Stack>
  );
}
