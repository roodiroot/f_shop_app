import { useMutation } from "@tanstack/react-query";

import { useAuth } from "@/auth/auth-context";
import { toast } from "@/utils/toast";
import { loginUser } from "../api/user";

export function useLogin() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (payload: { identifier: string; password: string }) => {
      const res = await loginUser(payload);
      if (!res.jwt) {
        throw new Error("Login failed");
      }

      return res;
    },
    onSuccess: async (data) => {
      await login(data.jwt, data.user);
      toast.info("Вход выполнен");
    },
  });
}
