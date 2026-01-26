import { createContext } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: unknown | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
