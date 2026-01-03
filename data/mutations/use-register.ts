import { useMutation } from "@tanstack/react-query";

import { RegisterForm } from "@/types/user";
import { toast } from "@/utils/toast";
import { router } from "expo-router";
import { registerUser } from "../api/user";

export function useRegister() {
  return useMutation({
    mutationFn: async (payload: RegisterForm) => {
      const res = await registerUser(payload);
      if (!res.user.documentId) {
        throw new Error("Register failed");
      }

      return res;
    },

    onSuccess: async () => {
      toast.info("Подтвердите почту и войдите в аккаунт");
      router.replace("/profile/login");
    },
  });
}
