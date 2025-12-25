import { useMutation } from "@tanstack/react-query";

import { requestResetPassword } from "../api/user";

export function useResetPass() {
  return useMutation({
    mutationFn: requestResetPassword,
  });
}
