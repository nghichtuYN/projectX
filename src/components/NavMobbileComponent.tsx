import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import React from "react";
import { cn } from "@/lib/utils";
import AccordionAccount, { User } from "./AccordionAccount";
import { Menu } from "../lib/Menu";
import ListItemMobile from "./listItemMobile";
import Link from "next/link";
type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const NavMobbileComponent = ({ open, setOpen }: Props) => {
  const user: User = {
    avatar: "https://github.com/shadcn.png",
    name: "Hoàng Đặng",
    email: "hoangtroll14354@gmail.com",
    id: "12312311",
  };
  return (
    <>
      <Collapsible open={open} onOpenChange={setOpen} className="w-full p-3 ">
        <CollapsibleContent
          className={cn(
            " rounded-md bg-white  border-t-2 transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
          )}
        >
          <Accordion type="single" collapsible className="w-full">
            <AccordionAccount user={user} />
            {Menu?.map((menu, index) => (
              <AccordionItem key={index} value={`item ${index + 2}`}>
                <AccordionTrigger
                  showIcon={!menu?.subMenu ? false : true}
                  className="font-semibold text-secondaryColor pl-4"
                >
                  <Link href={menu?.href}>{menu?.title}</Link>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="grid list-none  w-full gap-3 pl-2 pr-2">
                    {menu?.subMenu?.map((options) => (
                      <ListItemMobile
                        key={options.title}
                        title={options.title}
                        href={options.href}
                        icon={options.icon}
                      />
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};
