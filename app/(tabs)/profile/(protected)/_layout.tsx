import { useAuth } from "@/auth/auth-context";
import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
  const { auth } = useAuth();

  if (auth.isBootstrapping) return null; // или твой loader

  if (!auth.token) {
    return <Redirect href="/(tabs)/profile/(auth)/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="profile" />
      <Stack.Screen name="order-history" />
    </Stack>
  );
}
