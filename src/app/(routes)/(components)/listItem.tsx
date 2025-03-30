import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import React from "react";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ElementType }
>(({ className, title, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink className={"hover:text-secondaryColor"} asChild>
        <a
          ref={ref}
          className={cn(
            " select-none  space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors bg-accent gap-3 hover:text-accent-foreground flex items-center, content-center",
            className
          )}
          {...props}
        >
          {Icon && (
            <div className="mr-2 mt-1 inline-block">
              <Icon className="w-5 h-5 text-secondaryColor text-base" />
            </div>
          )}
          <div
            className={cn(
              "text-sm font-semibold leading-5 mt-0 ",
              props.href === "/login" && "text-red-700"
            )}
          >
            {title}{" "}
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";

export default ListItem;
