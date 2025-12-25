import { useMutation } from "@tanstack/react-query";

import { registerUser } from "../api/user";

export function useRegister() {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: async (data) => {
      console.log(data);
    },
    onError: async (data) => {
      console.log(data);
    },
  });
}
