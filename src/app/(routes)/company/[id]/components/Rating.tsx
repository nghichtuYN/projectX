import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/UserStore";
import { Review } from "@/types/Company";
import { UserRound, UserX } from "lucide-react";
import React from "react";
type Props = {
  review: Review;
  renderStars: (value: number, isInteractive?: boolean) => React.JSX.Element[];
};
const Rating = ({ review, renderStars }: Props) => {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="border-t pt-3">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-1.5">
          {review && review?.isAnonymous ? (
            <UserX className="h-4 w-4 text-gray-500" />
          ) : (
            <Avatar>
              <AvatarImage
                src={
                  !review?.candidate?.profilePicture.includes("images")
                    ? review?.candidate?.profilePicture
                    : `${process.env.NEXT_PUBLIC_API_URL_IMAGE}${review?.candidate?.profilePicture}`
                }
                alt="UV"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}
          <span
            className={cn(
              "font-medium text-sm",
              review && review.isAnonymous && "italic text-gray-500"
            )}
          >
            {review?.candidate?.name}
          </span>
          {review && review.isAnonymous && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1 py-0 h-4 border-gray-300 text-gray-500"
                  >
                    Ẩn danh
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Người dùng đã chọn ẩn danh khi đánh giá</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="flex">{renderStars(review?.point)}</div>
      </div>
      <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
    </div>
  );
};

export default Rating;
