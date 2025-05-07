import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

const EmployerSidebaHeaderComponent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <header className="fixed z-40 bg-white w-full flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center w-fit justify-between">
          {children}
        </div>
      </div>
    </header>
  );
};

export default EmployerSidebaHeaderComponent;
