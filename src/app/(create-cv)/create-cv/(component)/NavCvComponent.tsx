import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { navItems } from "@/data/navCvItems";
import CvTemplateComponent from "./CvTemplateComponent";
const NavCvComponent = () => {
  const [activeContent, setActiveContent] = useState<string>("");

  const handleNavClick = (content: string) => {
    setActiveContent(activeContent === content ? "" : content);
  };

  return (
    <div className="flex h-fit">
      {/* Sidebar Navigation */}
      <div className="w-[92px] flex flex-col items-center justify-start py-4 gap-2">
        {navItems.map((item) => (
          <Button
            key={item.title}
            variant="ghost"
            className={cn(
              "w-[85px] h-[85px] flex flex-col items-center space-y-1 hover:bg-secondaryColor hover:text-white bg-white",
              "text-center px-2",
              activeContent === item.content && "bg-secondaryColor text-white"
            )}
            onClick={() => handleNavClick(item.content)}
          >
            <item.icon size={1} className="w-12 h-12 text-secondaryColor" />
            <p className="text-xs font-medium text-center leading-tight break-normal whitespace-normal">
              {item.title}
            </p>
          </Button>
        ))}
      </div>

      {/* Side Panel for Navigation Content */}
      <div
        className={cn(
          "w-0 bg-white transition-all duration-300 overflow-hidden ",
          activeContent && "w-[340px] "
        )}
      >
        {activeContent && (
          <div className="w-[340px] h-[432px]">
            <div className={cn("p-4", activeContent && "border-b")}>
              <h2 className="text-lg font-semibold">
                {navItems.find((item) => item.content === activeContent)?.title}
              </h2>
            </div>
            <ScrollArea className="h-[400px]">
              <div className="p-4">
                {activeContent === "templates" && <CvTemplateComponent />}
                {activeContent === "sections" && (
                  <div>Add Sections Content</div>
                )}
                {activeContent === "library" && <div>CV Library Content</div>}
                {activeContent === "guide" && (
                  <div>CV Writing Guide Content</div>
                )}
                {activeContent === "jobs" && <div>Suitable Jobs Content</div>}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>

      {/* Main Content Area */}
    </div>
  );
};

export default NavCvComponent;
