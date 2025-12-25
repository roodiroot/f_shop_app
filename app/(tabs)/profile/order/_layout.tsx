import { Stack } from "expo-router";

export default function ProfileOrderLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[documentId]" />
    </Stack>
  );
}
