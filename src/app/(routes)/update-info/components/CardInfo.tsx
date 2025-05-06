import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/store/UserStore";
import Image from "next/image";

const CardInfo = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <Card className="w-full h-fit">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <Image
              src={
                user?.profilePicture.includes("http")
                  ? user?.profilePicture
                  : `${process.env.NEXT_PUBLIC_API_URL_IMAGE}/${user?.profilePicture}`
              }
              width={80}
              height={80}
              alt="Profile picture"
              className="rounded-full"
            />
            {user?.emailConfirmed ? (
              <div className="absolute -top-1 -right-1 bg-secondaryColor text-white text-[8px] px-1 rounded">
                VERIFIED
              </div>
            ) : (
              <div className="absolute -top-1 -right-1 bg-gray-500 text-white text-[8px] px-1 rounded">
                UNVERIFIED
              </div>
            )}
          </div>
          <div>
            <p className="text-gray-600">Chào bạn trở lại,</p>
            <h3 className="text-lg font-medium">Nguyễn Thu Trang</h3>
            {user?.emailConfirmed ? (
              <span className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded">
                Tài khoản đã xác thực
              </span>
            ) : (
              <span className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded">
                Tài khoản chưa xác thực
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardInfo;
