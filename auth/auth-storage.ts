import { UserAuth } from "@/types/user";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "authToken";
const USER_KEY = "userData";

export async function saveAuth(token: string, user: UserAuth) {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
  await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
}

export async function getAuth() {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  const userRaw = await SecureStore.getItemAsync(USER_KEY);
  return { token, user: userRaw ? JSON.parse(userRaw) : null };
}

export async function clearAuth() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(USER_KEY);
}
