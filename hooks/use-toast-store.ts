import { create } from "zustand";

export type ToastType = "success" | "error" | "info";

type ToastState = {
  visible: boolean;
  message: string;
  type: ToastType;
  show: (message: string, type?: ToastType) => void;
  hide: () => void;
};

let timeout: number | null = null;

export const useToastStore = create<ToastState>((set) => ({
  visible: false,
  message: "",
  type: "info",

  show: (message, type = "info") => {
    if (timeout) clearTimeout(timeout);

    set({ visible: true, message, type });

    timeout = setTimeout(() => {
      set({ visible: false });
    }, 2500);
  },

  hide: () => {
    if (timeout) clearTimeout(timeout);
    set({ visible: false });
  },
}));
