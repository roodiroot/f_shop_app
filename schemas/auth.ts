import { z } from "zod";

export const loginFormSchema = z.object({
  identifier: z
    .string()
    .min(2, { message: "Введите имя пользователя длиной от 2 символов." })
    .max(50, { message: "Введите имя пользователя длиной до 50 символов." }),
  password: z.string(),
});

export const registrationFormSchema = z
  .object({
    username: z
      .string()
      .min(3, "Логин должен содержать минимум 3 символа")
      .max(20, "Логин не должен превышать 20 символов")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Логин может содержать только буквы, цифры и символы подчеркивания"
      ),

    email: z.email("Введите корректный адрес электронной почты"),

    // phone: z
    //   .string()
    //   .transform((val) => val.replace(/[^\d+]/g, ""))
    //   .refine((val) => val.length >= 10, "Введите корректный номер телефона"),

    password: z
      .string()
      .min(6, "Пароль должен содержать минимум 6 символов")
      .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
      .regex(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
      .regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру")
      .regex(
        /[@$!%*?&]/,
        "Пароль должен содержать хотя бы один специальный символ (@, $, !, %, *, ?, &)"
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли должны совпадать",
    path: ["confirmPassword"], // Указываем, что ошибка относится к confirmPassword
  });

export const requestResetPasswordSchema = z.object({
  email: z.email("Введите корректный адрес электронной почты"),
});

export const resetPasswordSchema = z
  .object({
    code: z
      .string()
      .min(100, { message: "Code is required" })
      .max(255, { message: "Code is too long" }),
    password: z
      .string()
      .min(6, "Пароль должен содержать минимум 6 символов")
      .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
      .regex(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
      .regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру")
      .regex(
        /[@$!%*?&]/,
        "Пароль должен содержать хотя бы один специальный символ (@, $, !, %, *, ?, &)"
      ),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Пароли не совпадают",
    path: ["passwordConfirmation"],
  });
