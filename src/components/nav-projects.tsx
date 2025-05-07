"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/UserStore";
import { BadgeDollarSign, LucideIcon } from "lucide-react";

export function NavProjects({
  projects,
}: {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const user = useAuthStore((state) => state.user);

  return (
    <>
      {!user?.roles[0].includes("Admin") && (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarMenu>
            {projects.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  className="hover:text-secondaryColor"
                  asChild
                >
                  <a href={item.url}>
                    <item.icon className="text-secondaryColor" />
                    <span className="font-semibold">{item.name}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

            <SidebarMenuItem>
              <SidebarMenuButton className="hover:text-secondaryColor" asChild>
                <div className="flex items-center gap-2">
                  <BadgeDollarSign className="text-secondaryColor" />
                  <p className="font-semibold">
                    Số dư: {user?.xTokenBalance} X-TOKEN
                  </p>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      )}
    </>
  );
}
