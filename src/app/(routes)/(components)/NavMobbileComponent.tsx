'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import React, { use } from "react";
import { cn } from "@/lib/utils";
import AccordionAccount from "./AccordionAccount";
import { Menu } from "../../../data/Menu";
import ListItemMobile from "./listItemMobile";
import Link from "next/link";
import { useAuthStore } from "@/store/UserStore";
import { Button } from "@/components/ui/button";
type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const NavMobbileComponent = ({ open, setOpen }: Props) => {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        className={cn("w-full", open ? "pt-2" : "h-fit")}
      >
        <CollapsibleContent
          className={cn(
            " rounded-md bg-white overflow-hidden h-fit border-t-2 transition-all ml-3 mr-3 mb-3 shadow-md",
            " data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
          )}
        >
          <Accordion type="single" collapsible className="w-full">
            {user && <AccordionAccount setOpen={setOpen} user={user} />}
            {Menu?.map((menu, index) => (
              <AccordionItem key={index} value={`item ${index + 2}`}>
                <AccordionTrigger
                  showIcon={!menu?.subMenu ? false : true}
                  className="font-semibold text-secondaryColor pl-4"
                >
                  <Link onClick={()=>setOpen(false)} href={menu?.href}>{menu?.title}</Link>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="grid list-none  w-full gap-3 pl-2 pr-2">
                    {menu?.subMenu?.map((options) => (
                      <ListItemMobile
                        key={options.title}
                        title={options.title}
                        href={options.href}
                        icon={options.icon}
                        setOpen={setOpen}
                      />
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className=" items-center justify-between gap-3 flex mt-1 p-1">
            <Link href={"/login"}>
              <Button className="border-2 border-primaryColor hover:bg-gray-50 rounded-sm text-sm leading-[22px] font-semibold bg-white text-secondaryColor">
                Đăng nhập
              </Button>
            </Link>
            <Link href={"/employer-login"}>
              <Button className="rounded-sm text-sm leading-[22px] font-semibold text-white bg-primaryColor">
                Đăng tuyển & tìm hồ sơ
              </Button>
            </Link>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};
