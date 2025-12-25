import { payApi } from "@/data/api/checkout";
import { useMutation } from "@tanstack/react-query";
import * as Linking from "expo-linking";

export function usePay() {
  return useMutation({
    mutationFn: async (orderId: string) => {
      const res = await payApi(orderId);
      if (!res.ok) {
        throw new Error(res.error || "Payment failed");
      }
      return res;
    },
    onSuccess: async (res) => {
      const url = res.data?.confirmationUrl;
      if (!url) throw new Error("confirmationUrl is missing");

      const canOpen = await Linking.canOpenURL(url);
      if (!canOpen) throw new Error("Can't open url");

      await Linking.openURL(url);
    },
  });
}
