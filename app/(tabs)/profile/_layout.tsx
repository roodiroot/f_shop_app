import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(protected)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="order" />
    </Stack>
  );
}
