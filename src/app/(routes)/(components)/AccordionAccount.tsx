import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import { AccountMenu } from "../../../data/AccountMenu";
import ListItemMobile from "./listItemMobile";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
import { User } from "@/store/UserStore";

type Props = {
  user: User | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const AccordionAccount = ({ user,setOpen }: Props) => {
  return (
    <AccordionItem value="item-1">
      <AccordionTrigger className="pl-2">
        <div
          className={
            " select-none rounded-md p-3 leading-none no-underline outline-none transition-colors  gap-3  flex items-center, content-center"
          }
        >
          <Avatar className="pt-1">
            <AvatarImage
              className="rounded-3xl border-solid"
              src={
                user?.profilePicture
                  ? user.profilePicture
                  : "https://github.com/shadcn.png"
              }
              alt="avatar"
              width={50}
              height={50}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className={cn("text-sm block  font-semibold leading-5 mt-0 ")}>
            <div className={"text-secondaryColor"}>{user?.fullName}</div>
            <div>{user?.id}</div>
            <div>{user?.email}</div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <ul className="grid list-none  w-full gap-3 pl-2 pr-2">
          {AccountMenu.map((options) => (
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
  );
};

export default AccordionAccount;
