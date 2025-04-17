"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/UserStore";
import { getUser } from "@/services/user";
import { usePathname } from "next/navigation";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((state) => state.setUser);
  const pathname = usePathname();
  const isLoginPage = pathname.split("/").includes("login");
  const isRegisterPage = pathname.split("/").includes("register");
  const isEmployerLoginPage = pathname.split("/").includes("employer-login");
  const isEmployerRegisterPage = pathname
    .split("/")
    .includes("employer-register");
  const protectedRoutes = [
    "/admin",
    "/employer",
    "/profile",
    "/company",
    "/employer",
  ];
  const needsAuth = protectedRoutes.some((protectedPath) =>
    pathname.startsWith(protectedPath)
  );
  useEffect(() => {
    console.log("run1")
    const fetchUser = async () => {
      if (
        isLoginPage ||
        isRegisterPage ||
        isEmployerLoginPage ||
        isEmployerRegisterPage
      )
        return;
      try {
        const res = await getUser();
        setUser(res);
      } catch (error: any) {
        if (error) {
          if (needsAuth) {
            if (
              pathname.startsWith("/employer") ||
              pathname.startsWith("/company")
            ) {
              window.location.href = "/employer-login";
            } else {
              window.location.href = "/login";
            }
          } else {
            console.warn(
              "Chưa đăng nhập, nhưng route hiện tại được phép truy cập:",
              pathname
            );
          }
        } else {
          console.error("Lỗi khi gọi getUser:", error);
        }
      }
    };

    fetchUser();
  }, []);

  return <>{children}</>;
}
