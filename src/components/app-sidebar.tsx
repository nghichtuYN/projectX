"use client";
import React from "react";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { MenuEmployer } from "@/data/MenuEmployer";
import { usePathname } from "next/navigation";
import { MenuAdmin } from "@/data/MenuAdmin";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const isEmployer = pathname.startsWith("/employer");
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          teams={isEmployer ? MenuEmployer.teams : MenuAdmin.teams}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={isEmployer ? MenuEmployer.navMain : MenuAdmin.navMain}
        />
        <NavProjects
          projects={isEmployer ? MenuEmployer.projects : MenuAdmin.projects}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
