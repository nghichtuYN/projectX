import DialogImage from "@/app/(employer)/employer/settings/company/(component)/DialogImage";
import { FreelanceUser } from "@/types/Freelance";
import React from "react";
type Props = {
  row: FreelanceUser;
};
const BackIdCard = ({ row }: Props) => {
  return (
    <div className="flex w-full justify-center">
      <DialogImage
        image={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${row.freelanceRecruiter.backIdCard.path}`}
      />
    </div>
  );
};

export default BackIdCard;
