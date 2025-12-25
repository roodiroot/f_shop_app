import { getMe } from "@/data/api/user";
import { UserAuth } from "@/types/user";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AppState } from "react-native";
import { clearAuth, getAuth, saveAuth } from "./auth-storage";

type AuthState = {
  token: string | null;
  user: UserAuth | null;
  isBootstrapping: boolean;
};

type AuthContextType = {
  auth: AuthState;
  login: (token: string, user: UserAuth) => Promise<void>;
  logout: () => Promise<void>;
  refreshMe: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    token: null,
    user: null,
    isBootstrapping: true,
  });

  useEffect(() => {
    (async () => {
      const { token } = await getAuth();

      if (!token) {
        setAuth({ token: null, user: null, isBootstrapping: false });
        return;
      }

      const me = await getMe(token).catch(() => null);

      if (me?.username) {
        await saveAuth(token, me);
        setAuth({ token, user: me, isBootstrapping: false });
      } else {
        await clearAuth();
        setAuth({ token: null, user: null, isBootstrapping: false });
      }
    })();
  }, []);

  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        console.log("REFRESH");
        refreshMe();
      }
    });

    return () => sub.remove();
  }, [auth.token]);

  const login = async (token: string, user: UserAuth) => {
    await saveAuth(token, user);
    setAuth({ token, user, isBootstrapping: false });
  };

  const logout = async () => {
    await clearAuth();
    setAuth({ token: null, user: null, isBootstrapping: false });
  };

  const refreshMe = async () => {
    if (!auth.token) return;
    const me = await getMe(auth.token).catch(() => null);

    if (me?.username) {
      await saveAuth(auth.token, me);
      setAuth((s) => ({ ...s, user: me }));
    } else {
      await clearAuth();
      setAuth({ token: null, user: null, isBootstrapping: false });
    }
  };

  const value = useMemo(() => ({ auth, login, logout, refreshMe }), [auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
