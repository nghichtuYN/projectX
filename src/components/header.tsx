"use client";
import React from "react";
import NavMenuComponent from "@/components/NavMenuComponent";
import SiteComponent from "@/components/SiteComponent";
import ToggleHeader from "@/components/ToggleHeader";
import { cn } from "@/lib/utils";

import { NavMobbileComponent } from "./NavMobbileComponent";

const Header = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <header className="bg-white shadow-sm w-full">
      <div className=" mx-auto px-4 bg-secondaryColor text-white w-full ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold">Project X</h1>
            <NavMenuComponent />
          </div>
          <ToggleHeader open={open} setOpen={setOpen} />

          <div className="hidden lg:flex items-center space-x-4">
            <SiteComponent />
          </div>
        </div>
      </div>
      <div
        className={cn(
          "bg-accent duration-1000  transition-all  ease-in-out",
          open ? "block" : "hidden"
        )}
      >
        <NavMobbileComponent open={open} setOpen={setOpen} />
      </div>
    </header>
  );
};

export default Header;
