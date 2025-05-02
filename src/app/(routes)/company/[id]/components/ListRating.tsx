import { Review } from "@/types/Company";
import React from "react";
import Rating from "./Rating";
type Props = {
  reviews: Review[] | undefined;
  renderStars: (value: number, isInteractive?: boolean) => React.JSX.Element[];
};
const ListRating = ({ reviews, renderStars }: Props) => {
  return (
    <div>
      {reviews && reviews?.length > 0 ? (
        reviews.map((review) => (
          <Rating key={review?.id} renderStars={renderStars} review={review} />
        ))
      ) : (
        <p className="text-sm text-gray-500 italic">Chưa có đánh giá nào</p>
      )}
      
    </div>
  );
};

export default ListRating;
