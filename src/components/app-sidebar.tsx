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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={MenuEmployer.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={MenuEmployer.navMain} />
        <NavProjects projects={MenuEmployer.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={MenuEmployer.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
