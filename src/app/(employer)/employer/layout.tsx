"use client";
import { AppSidebar } from "@/components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/UserStore";
import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { useEffect } from "react";
export default function DashBoardEmployerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (
      user &&
      user.roles[0] !== "Business" &&
      user.roles[0] !== "PreelanceRecruiter"
    ) {
      return notFound();
    }
  }, [user]);
  if (!user) {
    return (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      </>
    );
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="relative bg-accent">
        <div className="grid-cols-1 place-items-center">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
