"use client";
import { MenuAccountEmployerSettting } from "@/data/MenuAccountEmployerSettting";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";

const NavAccountSettingComponent = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  return (
    <div className="h-full pt-2">
      {MenuAccountEmployerSettting?.map((item, index) => {
        const isActive =
          item.content === pathname || pathSegments.includes(item.content);
        return (
          <div
            key={index}
            className={cn(
              "flex items-center gap-3 cursor-pointer mb-2 p-2",
              isActive && "text-secondaryColor font-semibold" // Làm nổi bật nếu active
            )}
          >
            {item.icon && <item.icon className="w-4 h-4" />}
            {item.title}
          </div>
        );
      })}
    </div>
  );
};

export default NavAccountSettingComponent;
