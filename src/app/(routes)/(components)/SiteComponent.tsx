import React from "react";
import { Button } from "@/components/ui/button";
import { Bell, ChevronsRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AccountMenu } from "@/data/AccountMenu";
import ListItem from "@/app/(routes)/(components)/listItem";
const SiteComponent = () => {
  const styleNav =
    "font-semibold rounded-none leading-5 text-sm data-[state=open]:bg-secondaryColor hover:text-white" +
    " hover:bg-secondaryColor bg-secondaryColor ";
  return (
    <>
      <div className="flex items-center">
        <div className="border-r pr-2 gap-2 flex flex-col ">
          <span className="p-0 m-0 text-xs font-normal text-fourthColor leading-4">
            Bạn là nhà tuyển dụng?
          </span>
          <Link
            href={"/employer-login"}
            className="p-0 m-0 text-sm font-normal flex items-center hover:text-hoverColor text-thirdColor leading-3"
          >
            Đăng tuyển ngay <ChevronsRight />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Link href="/messages">
            <MessageCircle className="h-5 w-5" />
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(styleNav)}>
                  <Avatar>
                    <AvatarImage
                      className="rounded-3xl w-5 h-5"
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </NavigationMenuTrigger>
                <NavigationMenuContent className={"!right-0 !left-auto"}>
                  <ul className="grid list-none  w-[300px] gap-3 p-4 md:w-[400px]">
                    <div
                      className={cn(
                        " select-none  space-y-1 rounded-md p-3 leading-none no-underline",
                        " outline-none transition-colors bg-accent gap-3 hover:text-accent-foreground flex items-center, content-center"
                      )}
                    >
                      <Avatar>
                        <AvatarImage
                          className="rounded-3xl w-10 h-10"
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div
                        className={cn(
                          "text-sm block  font-semibold leading-5 mt-0 "
                        )}
                      >
                        <div className={"text-secondaryColor"}>Hoàng Đặng</div>
                        <div>Mã ứng viên</div>
                        <div>Email</div>
                      </div>
                    </div>
                    {AccountMenu.map((job) => (
                      <ListItem
                        key={job.title}
                        title={job.title}
                        href={job.href}
                        icon={job.icon}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </>
  );
};

export default SiteComponent;
