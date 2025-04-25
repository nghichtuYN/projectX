import React from "react";
import { Button } from "@/components/ui/button";
import { Bell, ChevronsRight, LogOut, MessageCircle } from "lucide-react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AccountMenu } from "@/data/AccountMenu";
import ListItem from "@/app/(routes)/(components)/listItem";
import { useAuthStore } from "@/store/UserStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const SiteComponent = () => {
  const styleNav =
    "font-semibold rounded-none leading-5 text-sm data-[state=open]:bg-secondaryColor hover:text-white" +
    " hover:bg-secondaryColor bg-secondaryColor ";
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const handleSignOut = async () => {
    await logout();
    toast.success("Đăng xuất thành công🚀");
    router.push("/login");
  };
  return (
    <>
      <div className="flex items-center">
        <div className="flex items-start gap-3">
          <Link href="/messages ">
            <div className="bg-accent p-2 rounded-3xl">
              <Bell className="h-5 w-5 text-secondaryColor" />
            </div>
          </Link>
          <Link href="/messages ">
            <div className="bg-accent p-2 rounded-3xl">
              <MessageCircle className="h-5 w-5 text-secondaryColor" />
            </div>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="">
                <NavigationMenuTrigger className={cn(styleNav)}>
                  <Avatar>
                    <AvatarImage
                      className="rounded-3xl w-9 h-9  border-solid"
                      src={
                        user?.profilePicture && user?.provider === "Google"
                          ? user?.profilePicture
                          : `${process.env.NEXT_PUBLIC_API_URL_IMAGE}${user?.profilePicture}`
                      }
                      alt="avatar"
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
                      <Avatar className="basis-1/6">
                        <AvatarImage
                          className="rounded-3xl w-10 h-10  border-solid"
                          src={
                            user?.profilePicture && user?.provider === "Google"
                              ? user?.profilePicture
                              : `${process.env.NEXT_PUBLIC_API_URL_IMAGE}${user?.profilePicture}`
                          }
                          alt="avatar"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div
                        className={cn(
                          "text-xs block   font-semibold leading-5 mt-0 "
                        )}
                      >
                        <div className={"text-secondaryColor"}>
                          {user?.fullName}
                        </div>
                        <div className="truncate ">
                          Mã ứng viên: {user?.id.replace(/-/g, "")}
                        </div>
                        <div>{user?.email}</div>
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
                    <li
                      onClick={() => {
                        handleSignOut();
                      }}
                    >
                      <NavigationMenuLink
                        className={"hover:text-secondaryColor "}
                        asChild
                      >
                        <div
                          className={cn(
                            "select-none cursor-pointer space-y-1 rounded-md p-3 leading-none no-underline outline-none",
                            " transition-colors bg-accent gap-3 hover:text-accent-foreground flex items-center, content-center"
                          )}
                        >
                          <div className="mr-2 mt-1 inline-block">
                            <LogOut className="w-5 h-5 text-secondaryColor text-base" />
                          </div>
                          <div
                            className={cn(
                              "text-sm font-semibold leading-5 mt-0 text-red-700 hover:text-secondaryColor"
                            )}
                          >
                            Đăng xuất
                          </div>
                        </div>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="border-l pl-2 gap-2 flex flex-col ">
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
      </div>
    </>
  );
};

export default SiteComponent;
