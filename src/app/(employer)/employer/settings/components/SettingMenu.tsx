import { BusinessSettting } from "@/data/BusinessSettting";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/navCvItems";
import Link from "next/link";
import React from "react";

type Props = {
  pathSegments: string[];
  pathname: string;
  settingOptions: NavItem[];
};

const SettingMenu = ({ pathSegments, pathname, settingOptions }: Props) => {
  return (
    <div>
      {settingOptions.map((item, index) => {
        const isActive =
          item.content === pathname || pathSegments.includes(item.content);
        return (
          <Link
            href={`/employer/settings/${item.content}`}
            key={index}
            className={cn(
              "flex items-center gap-3 cursor-pointer mb-2 p-2",
              isActive && "text-secondaryColor font-semibold"
            )}
          >
            {item.icon && <item.icon className="w-4 h-4" />}
            {item.title}
          </Link>
        );
      })}
    </div>
  );
};

export default SettingMenu;
