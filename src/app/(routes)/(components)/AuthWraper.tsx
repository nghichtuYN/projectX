"use client";

import { createContext, useEffect, useState } from "react";
import { useAuthStore } from "@/store/UserStore";
interface AuthContextType {
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((state) => state.user);
  const loadUser = useAuthStore((state) => state.loadUser);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!user) {
      setIsLoading(true);
      loadUser();
      setIsLoading(false);
    }
  }, [user, loadUser]);

  return (
    <AuthContext.Provider value={{ isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
