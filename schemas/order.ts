import { z } from "zod";

export const orderFormSchema = z.object({
  name: z
    .string()
    .min(3, "Логин должен содержать минимум 3 символа")
    .max(20, "Логин не должен превышать 20 символов")
    .regex(
      /^[a-zA-Zа-яА-ЯёЁ0-9_]+$/,
      "Логин может содержать только буквы, цифры и символы подчеркивания"
    ),

  email: z.email("Введите корректный адрес электронной почты"),

  phone: z
    .string()
    .transform((val) => val.replace(/[^\d+]/g, ""))
    .refine((val) => val.length >= 10, "Введите корректный номер телефона"),

  address: z
    .string()
    .max(200, "Адрес не должен превышать 200 символов")
    .optional(),

  comment: z.string().optional(),

  agree: z.boolean().refine((val) => val === true, "Необходимо ваше согласие"),
});
