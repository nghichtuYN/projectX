import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/store/UserStore";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";
type Props = {
  user: User | null;
};
const CardUser = ({ user }: Props) => {
  if (!user) {
    return <Loader2 className="animate-spin h-5 w-5" />;
  }
  return (
    <Card className="w-full h-[500px]">
      <CardHeader>
        <CardTitle className="flex gap-4">
          <div className="h-16 w-16 flex-shrink-0 rounded-3xl">
            <div className="relative h-full w-full overflow-hidden rounded-full bg-gray-100">
              <Image
                src={
                  user?.profilePicture && user?.provider === "Google"
                    ? user?.profilePicture
                    : `${process.env.NEXT_PUBLIC_API_URL_IMAGE}${user?.profilePicture}`
                }
                alt="user log"
                fill
                className="rounded-full border"
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="text-sm font-normal hover:text-secondaryColor">
              Chào bạn trở lại,
            </p>
            <h3 className="font-semibold hover:text-secondaryColor">
              {user?.fullName}
            </h3>
            <div className="w-full bg-accent text-xs font-normal p-1">
              {user?.emailConfirmed && "Tài khoản đã xác thực"}
            </div>
          </div>
        </CardTitle>
        <CardDescription className="sr-only"></CardDescription>
      </CardHeader>
    </Card>
  );
};

export default CardUser;
