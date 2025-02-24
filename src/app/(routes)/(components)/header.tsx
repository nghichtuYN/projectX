"use client";
import React from "react";
import NavMenuComponent from "@/app/(routes)/(components)/NavMenuComponent";
import SiteComponent from "@/app/(routes)/(components)/SiteComponent";
import { cn } from "@/lib/utils";

import { NavMobbileComponent } from "./NavMobbileComponent";
import Link from "next/link";
import ToggleHeader from "./ToggleHeader";

const Header = () => {
  const [open, setOpen] = React.useState<boolean>(false);
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

          <div className="hidden xl:flex items-center space-x-4">
            <SiteComponent />
          </div>
        </div>
      </div>
      <div className={cn("bg-accent")}>
        <NavMobbileComponent open={open} setOpen={setOpen} />
      </div>
    </header>
  );
};

export default Header;
