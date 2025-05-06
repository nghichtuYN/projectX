import React from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import ListItem from "@/app/(routes)/(components)/listItem";
import { Menu } from "../../../data/Menu";

const NavMenuComponent = () => {
  const pathname = usePathname();
  const styleNav =
    "font-semibold rounded-none leading-5 text-sm data-[state=open]:bg-secondaryColor hover:text-white" +
    " hover:bg-secondaryColor bg-secondaryColor ";
  return (
    <>
      <NavigationMenu className={"hidden xl:block pr-2 z-50"}>
        <NavigationMenuList>
          {Menu.map((menu, index) =>
            menu?.subMenu ? (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger
                  className={cn(
                    styleNav,
                    pathname === menu?.href && "text-hoverColor"
                  )}
                >
                  <NavigationMenuLink href={menu?.href}>
                    {menu?.title}
                  </NavigationMenuLink>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3 p-4 md:w-[400px]">
                    {menu?.subMenu?.map((submenu) => (
                      <ListItem
                        key={submenu.title}
                        title={submenu.title}
                        href={submenu.href}
                        icon={submenu.icon}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem className="px-3 py-4" key={index}>
                <Link  href={menu?.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      styleNav,
                      pathname === menu?.href && "text-hoverColor"
                    )}
                  >
                    {menu.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default NavMenuComponent;
