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
import { useAuthStore } from "@/store/UserStore";
import { MenuFreelance } from "@/data/MenuFreeLance";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const isEmployer = pathname.startsWith("/employer");
  const user = useAuthStore((state) => state.user);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          teams={isEmployer ? MenuEmployer.teams : MenuAdmin.teams}
        />
      </SidebarHeader>
      <SidebarContent>
        {isEmployer && user?.roles[0].includes("Business") && (
          <NavMain items={MenuEmployer.navMain} />
        )}
        {isEmployer && !user?.roles[0].includes("Business") && (
          <NavMain items={MenuFreelance.navMain} />
        )}
        {!isEmployer && !user?.roles[0].includes("Business") && (
          <NavMain items={MenuAdmin.navMain} />
        )}
        {/* <NavMain
          items={isEmployer ? MenuEmployer.navMain : MenuAdmin.navMain}
        /> */}
        {isEmployer && user?.roles[0].includes("Business") && (
          <NavProjects projects={MenuEmployer.projects} />
        )}
        {isEmployer && !user?.roles[0].includes("Business") && (
          <NavProjects projects={MenuFreelance.projects} />
        )}
        {!isEmployer && !user?.roles[0].includes("Business") && (
          <NavProjects projects={MenuAdmin.projects} />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
