import { useMutation } from "@tanstack/react-query";

import { useAuth } from "@/auth/auth-context";
import { checkout, CheckoutPayload } from "../api/checkout";

export function useCreateOrder() {
  const { auth } = useAuth();

  return useMutation({
    mutationFn: async (payload: CheckoutPayload) =>
      await checkout(payload, auth?.token),
  });
}
