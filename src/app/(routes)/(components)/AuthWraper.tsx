"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useAuthStore } from "@/store/UserStore";
import { getUser } from "@/services/user";
import { usePathname } from "next/navigation";
import { getSignalRConnection } from "@/lib/signalrConnection";
import { Message } from "@/types/Conversation";

type SignalRContextType = {
  connection: any;
  notifications: any[];
};
export const SignalRContext = createContext<SignalRContextType | null>(null);
export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((state) => state.setUser);
  const pathname = usePathname();
  const [connection, setConnection] = useState<any>(null);
  const [notifications, setNotifications] = useState<any>([]);
  const isLoginPage = pathname.split("/").includes("login");
  const isRegisterPage = pathname.split("/").includes("register");
  const isEmployerLoginPage = pathname.split("/").includes("employer-login");
  const isEmployerRegisterPage = pathname
    .split("/")
    .includes("employer-register");
  const protectedRoutes = ["/admin", "/employer", "/profile"];
  const needsAuth = protectedRoutes.some((protectedPath) =>
    pathname.startsWith(protectedPath)
  );

  useEffect(() => {
    const fetchUserAndInitSignalR = async () => {
      if (
        isLoginPage ||
        isRegisterPage ||
        isEmployerLoginPage ||
        isEmployerRegisterPage
      ) {
        return;
      }

      try {
        const res = await getUser();
        setUser(res);
        const conn = getSignalRConnection();
        setConnection(conn);
        await conn.start();
        console.log("✅ Đã kết nối SignalR");

        conn.on("ReceiveNotification", (data) => {
          console.log("🔔 Thông báo mới:", data);
          setNotifications((prev: any[]) => [...prev, data]);
        });
      } catch (error: any) {
        if (error.status === 401) {
          if (needsAuth) {
            if (
              pathname.startsWith("/employer") ||
              pathname.startsWith("/company")
            ) {
              window.location.href = "/employer-login";
            } else if (pathname.startsWith("/admin")) {
              window.location.href = "/admin/login";
            } else {
              window.location.href = "/login";
            }
          } else {
            console.warn(
              "⚠️ Không đăng nhập nhưng vẫn được truy cập:",
              pathname
            );
          }
          return false;
        }
      }
    };

    fetchUserAndInitSignalR();

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, []);

  return (
    <SignalRContext.Provider
      value={{ connection, notifications }}
    >
      {children}
    </SignalRContext.Provider>
  );
}
