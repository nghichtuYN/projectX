import { FreelanceUser } from "@/types/Freelance";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
type Props = {
  row: FreelanceUser;
};
const UserColumn = ({ row }: Props) => {
  return (
    <div className="flex flex-col items-start h-32 gap-2">
      <p className="text-sm font-semibold">{row.fullName}</p>
      <p className="text-xs font-medium text-gray-500 ">Email: {row.email}</p>
      <div className="text-xs font-medium text-gray-500 flex items-center">
        SĐT:
        {!!row.phoneNumber ? row.phoneNumber : " - -"}
      </div>
      <div className="hidden group-hover:flex text-sm font-medium gap-1 mt-2">
        <div className="flex items-center gap-2">
          <Link
            className=" hover:text-secondaryColor flex items-center gap-1 text-xs"
            href={`/employer/recruitment-campaigns/`}
          >
            <MessageCircle className="w-4 h-4" />
            Nhắn tin
          </Link>
          <span className="cursor-pointer"></span>
        </div>
      </div>
    </div>
  );
};

export default UserColumn;
