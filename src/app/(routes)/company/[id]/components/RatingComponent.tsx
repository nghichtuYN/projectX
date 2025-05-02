"use client";
import FilterComponent from "@/app/(employer)/employer/recruitment-campaigns/(components)/FilterJobComponent";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SortOptions } from "@/data/Jobs";
import { useMutationHook } from "@/hooks/useMutationHook";
import { cn } from "@/lib/utils";
import { getRatings } from "@/queries/queries";
import { rateCompany } from "@/services/company";
import { Info, Loader2, ScrollText, Send, Star } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import ListRating from "./ListRating";
import PaginationComponent from "@/components/PaginationComponent";
type Props = {
  id: string;
};
const RatingComponent = ({ id }: Props) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [comment, setComment] = useState("");

  const pathName = usePathname();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "create";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const router = useRouter();
  const handleFilterBy = (sort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (sort) {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  };

  const { data: reivews, refetch } = getRatings(id, currentPage, 2, sort);
  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const onSuccess = (data: any) => {
    toast.success(`Đánh giá công ty thành công`);
    refetch();
  };
  const onError = (error: any) => {
    toast.error(`Bạn đã đánh giá công ty này rồi`);
  };
  const mutation = useMutationHook(
    (data: {
      id: string;
      point: number;
      comment: string;
      isAnonymous: boolean;
    }) => {
      const { id, ...rest } = data;
      return rateCompany(id, rest);
    },
    onSuccess,
    onError
  );
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !comment.trim()) return;
    mutation.mutate({ id, comment, point: rating, isAnonymous });
    setRating(0);
    setComment("");
    setIsAnonymous(false);
  };
  const renderStars = (value: number, isInteractive = false) => {
    return Array(5)
      .fill(0)
      .map((_, index) => {
        const starValue = index + 1;
        const filled = isInteractive
          ? (hoverRating || rating) >= starValue
          : value >= starValue;

        return (
          <Star
            key={index}
            className={cn(
              "h-5 w-5 cursor-pointer transition-colors",
              filled ? "fill-amber-400 text-amber-400" : "text-gray-300"
            )}
            onClick={
              isInteractive ? () => handleRatingClick(starValue) : undefined
            }
            onMouseEnter={
              isInteractive ? () => setHoverRating(starValue) : undefined
            }
            onMouseLeave={isInteractive ? () => setHoverRating(0) : undefined}
          />
        );
      });
  };
  return (
    <div>
      <h4 className="font-medium mb-3 flex items-center gap-2">
        {" "}
        <ScrollText className="h-5 w-5" /> Đánh giá công ty
      </h4>

      {/* Rating Form */}
      <form onSubmit={handleSubmitReview} className="mb-4">
        <div className="flex items-center mb-3">
          <span className="text-sm mr-2">Đánh giá của bạn:</span>
          <div className="flex">{renderStars(rating, true)}</div>
        </div>

        <Textarea
          placeholder="Chia sẻ đánh giá của bạn về công ty này..."
          className="mb-2 text-sm"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex items-center justify-end space-x-2 mb-3">
          <Checkbox
            id="anonymous"
            checked={isAnonymous}
            onCheckedChange={(checked) => setIsAnonymous(checked === true)}
          />
          <label
            htmlFor="anonymous"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
          >
            Đánh giá ẩn danh
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 ml-1 text-gray-500 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>
                    Tên của bạn sẽ được hiển thị là "Ẩn danh" và không ai có thể
                    biết danh tính của bạn.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </label>
        </div>
        <Button
          type="submit"
          className="bg-secondaryColor hover:bg-secondaryColor/90 text-white"
          size="sm"
          disabled={rating === 0 || !comment.trim()}
        >
          {mutation?.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Đang đăng
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Gửi đánh giá
            </>
          )}
        </Button>
      </form>

      {/* Existing Reviews */}
      <div className="space-y-4">
        <div className="flex items-center w-full">
          <h5 className="text-sm font-medium text-gray-700 w-3/5">
            Đánh giá gần đây
          </h5>

          <div className="w-1/4">
            <FilterComponent
              dataOptions={SortOptions}
              filterBy={sort}
              placeholder="Tất cả đánh giá"
              onChangeFilterByValue={handleFilterBy}
            />
          </div>
        </div>
        <ListRating reviews={reivews?.items} renderStars={renderStars} />
        <div className="flex justify-end">
          <PaginationComponent
            currentPage={reivews?.pageNumber}
            totalPages={Math.ceil(reivews?.totalItems / 2)}
            className="flex justify-end"
          />
        </div>
      </div>
    </div>
  );
};

export default RatingComponent;
