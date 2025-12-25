import { useMutation } from "@tanstack/react-query";

import { useAuth } from "@/auth/auth-context";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { checkout, CheckoutPayload } from "../api/checkout";

export function useCreateOrder() {
  const { auth } = useAuth();

  return useMutation({
    mutationFn: async (payload: CheckoutPayload) => {
      const res = await checkout(payload, auth?.token);
      if (!res.ok) {
        throw new Error(res.error || "Payment failed");
      }

      return res;
    },

    onSuccess: async (res) => {
      const url = res.data?.confirmationUrl;
      if (!url) throw new Error("confirmationUrl is missing");

      router.replace(`/(tabs)/profile/order/${res.data?.orderId}`);

      const canOpen = await Linking.canOpenURL(url);
      if (!canOpen) throw new Error("Can't open url");

      await Linking.openURL(url);
    },
  });
}
