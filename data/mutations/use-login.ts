import { useMutation } from "@tanstack/react-query";

import { useAuth } from "@/auth/auth-context";
import { loginUser } from "../api/user";

export function useLogin() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      await login(data.jwt, data.user);
    },
  });
}
