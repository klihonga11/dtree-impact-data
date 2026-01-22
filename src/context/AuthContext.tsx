import { useEffect, useState, type JSX, type ReactNode } from "react";
import { AuthContext } from "./auth.context";

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<unknown | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/dhis2/api/me", {
        credentials: "include",
        redirect: "manual",
      });

      // Handle redirect (not authenticated)
      if (response.type === "opaqueredirect" || response.status === 0) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      if (!response.ok) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      const data = await response.json();
      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log("Auth check failed", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    const credentials = btoa(`${username}:${password}`);

    const response = await fetch("/dhis2/api/me", {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
      credentials: "include",
      redirect: "manual",
    });

    if (!response.ok && response.type !== "opaqueredirect") {
      throw new Error("Failed to login");
    }

    const data = await response.json();
    setUser(data);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await fetch("/dhis2/dhis-web-commons-security/logout.action", {
      credentials: "include",
      redirect: "manual",
    });

    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
