"use client";
import { BusinessSettting } from "@/data/BusinessSettting";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/UserStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import SettingMenu from "./SettingMenu";
import { FreelanceSettting } from "@/data/FreeLanceSettting";

const NavAccountSettingComponent = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const user = useAuthStore((state) => state.user);
  return (
    <div className="h-full pt-2 bg-gray-200">
      {user?.roles[0] === "Business" ? (
        <SettingMenu
          pathSegments={pathSegments}
          pathname={pathname}
          settingOptions={BusinessSettting}
        />
      ) : (
        <SettingMenu
          pathSegments={pathSegments}
          pathname={pathname}
          settingOptions={FreelanceSettting}
        />
      )}
    </div>
  );
};

export default NavAccountSettingComponent;
