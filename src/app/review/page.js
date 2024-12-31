import Reviews from "@/components/hotel/details/Reviews";
import ReviewModal from "@/components/review/ReviewModal";
import React from "react";

const ReviewPage = () => {
  return (
    <div>
      <ReviewModal>
        <Reviews />
      </ReviewModal>
    </div>
  );
};

export default ReviewPage;
