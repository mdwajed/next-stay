import Reviews from "@/components/hotel/details/Reviews";
import React from "react";
import { auth } from "../../../../../auth";

const ReviewPage = async () => {
  const session = await auth();
  console.log("Review session", session);
  return (
    <div>
      <Reviews session={session} />
    </div>
  );
};

export default ReviewPage;
