import { GET_MY } from "@/graphql/user";
import client from "@/lib/apollo-client";

import { RegisterForm, UserAuth, UserResponseType } from "@/types/user";

const errorDictionary: Record<string, string> = {
  "Email or Username are already taken":
    "Электронная почта или имя пользователя уже заняты",
  "Too many requests, please try again later.":
    "Слишком много запросов. Пожалуйста, попробуйте позже",
  "Invalid credentials": "Неверные учетные данные",
  "User not found": "Пользователь не найден",
};

export const getMe = async (token: string) => {
  const { data } = await client.query<UserResponseType>({
    query: GET_MY,
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    fetchPolicy: "no-cache",
  });

  return data?.me || null;
};

export const registerUser = async (
  userData: RegisterForm
): Promise<{ jwt: string; user: UserAuth }> => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/api/auth/local/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();

    // Переводим ошибку, если она есть в словаре
    const errorMessage =
      errorDictionary[errorData.error.message] ||
      errorData.error.message ||
      "Что-то пошло не так. Не удалось завершить регистрацию.";
    throw new Error(errorMessage);
  }

  return await response.json();
};

export const loginUser = async (credentials: {
  identifier: string;
  password: string;
}): Promise<{ jwt: string; user: UserAuth }> => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/api/auth/local`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    const message = data?.error?.message || data?.message || "Login failed";

    throw new Error(message);
  }

  return await data;
};

export const requestResetPassword = async (email: string) => {
  await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
};
