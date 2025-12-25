import { useAuth } from "@/auth/auth-context";
import HeaderAuth from "@/components/layout/header-auth";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { auth } = useAuth();

  if (auth.isBootstrapping) return null; // или твой loader

  if (auth.token) {
    return <Redirect href="/(tabs)/profile/(protected)/profile" />;
  }

  return (
    <Stack screenOptions={{ headerShown: true, header: () => <HeaderAuth /> }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="request-password-reset" />
    </Stack>
  );
}
