import { AppSidebar } from "@/components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
export default function DashBoardEmployerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="relative bg-accent">
        <div>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
