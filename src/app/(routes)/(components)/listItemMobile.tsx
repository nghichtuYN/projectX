import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const ListItemMobile = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ElementType; title: string }
>(({ className, title, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <Link
        href={props.href || "#"}
        className={cn(
          "hover:text-secondaryColor select-none w-full space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors bg-accent gap-3 hover:text-accent-foreground flex items-center content-center",
          className
        )}
        ref={ref}
      >
        {Icon && (
          <div className="mr-2 mt-1 inline-block">
            <Icon className="w-5 h-5 text-secondaryColor text-base" />
          </div>
        )}
        <div
          className={cn(
            "text-sm font-semibold leading-5 mt-0",
            props.href === "/logout" && "text-red-700"
          )}
        >
          {title}
        </div>
      </Link>
    </li>
  );
});

ListItemMobile.displayName = "ListItemMobile";

export default ListItemMobile;
