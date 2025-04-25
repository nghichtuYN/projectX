"use client";
import NavMenuComponent from "@/app/(routes)/(components)/NavMenuComponent";
import SiteComponent from "@/app/(routes)/(components)/SiteComponent";
import { cn } from "@/lib/utils";
import { NavMobbileComponent } from "./NavMobbileComponent";
import Link from "next/link";
import ToggleHeader from "./ToggleHeader";
import { useAuthStore } from "@/store/UserStore";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  return (
    <header className="bg-white shadow-sm w-full sticky top-0 z-50 ">
      <div className="  mx-auto px-4 sm:px-6 lg:px-8 bg-secondaryColor text-white w-full ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href={"/"}>
              <h1 className="text-2xl font-bold ml-2 italic bg-gradient-to-r from-hoverColor to-fourthColor text-transparent bg-clip-text">Project X</h1>
            </Link>
            <NavMenuComponent />
          </div>
          <ToggleHeader open={open} setOpen={setOpen} />
          {user ? (
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
