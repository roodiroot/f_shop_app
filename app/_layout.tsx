import { Stack } from "expo-router";

import ApolloWrapper from "@/providers/appolo-providers";
import { StatusBar } from "expo-status-bar";

import Header from "@/components/layout/header";
import QueryProvider from "@/providers/query-client-provider";

import "./global.css";

export default function RootLayout() {
  return (
    <QueryProvider>
      <ApolloWrapper>
        <StatusBar style="dark" />
        <Stack
          initialRouteName="(tabs)"
          screenOptions={{
            headerShown: true,
            header: () => <Header />,
            contentStyle: {
              backgroundColor: "#f9fafb",
            },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          <Stack.Screen
            name="(modals)"
            options={{
              headerShown: false,
              presentation: "modal",
            }}
          />

          <Stack.Screen
            name="checkout"
            options={{
              title: "Checkout",
            }}
          />
        </Stack>
      </ApolloWrapper>
    </QueryProvider>
  );
}
