import { useToastStore } from "@/hooks/use-toast-store";

export const toast = {
  success: (msg: string) => useToastStore.getState().show(msg, "success"),
  error: (msg: string) => useToastStore.getState().show(msg, "error"),
  info: (msg: string) => useToastStore.getState().show(msg, "info"),
};
