"use client";
import React, { useContext } from "react";
import NavMenuComponent from "@/app/(routes)/(components)/NavMenuComponent";
import SiteComponent from "@/app/(routes)/(components)/SiteComponent";
import { cn } from "@/lib/utils";

import { NavMobbileComponent } from "./NavMobbileComponent";
import Link from "next/link";
import ToggleHeader from "./ToggleHeader";
import { useAuthStore } from "@/store/UserStore";
import { Button } from "@/components/ui/button";
import { AuthContext } from "./AuthWraper";
import { Skeleton } from "@/components/ui/skeleton";

const Header = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const context = useContext(AuthContext);
  const isLoading = context?.isLoading ?? true;
  console.log(isLoading);
  return (
    <header className="bg-white shadow-sm w-full  z-50">
      <div className="  mx-auto px-4 sm:px-6 lg:px-8 bg-secondaryColor text-white w-full ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold ml-2">
              <Link href={"/"}>Project X</Link>
            </h1>
            <NavMenuComponent />
          </div>
          <ToggleHeader open={open} setOpen={setOpen} />
          {isLoading ? (
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-36" />
            </div>
          ) : user ? (
            <div className="hidden xl:flex items-center space-x-4">
              <SiteComponent />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href={"/login"}>
                <Button className="border-2 border-primaryColor hover:bg-gray-50 rounded-sm text-sm leading-[22px] font-semibold bg-white text-secondaryColor">
                  Đăng nhập
                </Button>
              </Link>
              <Link href={"/register"}>
                <Button className="rounded-sm text-sm leading-[22px] font-semibold text-white">
                  Đăng ký
                </Button>
              </Link>
              <Link href={"/employer-login"}>
                <Button className="rounded-sm text-sm leading-[22px] font-semibold text-white bg-primaryColor">
                  Đăng tuyển & tìm hồ sơ
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className={cn("bg-accent")}>
        <NavMobbileComponent open={open} setOpen={setOpen} />
      </div>
    </header>
  );
};

export default Header;
