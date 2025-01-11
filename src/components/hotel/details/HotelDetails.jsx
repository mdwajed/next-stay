"use client";
import React, { useCallback, useEffect, useState } from "react";
import CheckInOutForm from "./CheckInOutForm";
import Reviews from "./Reviews";
import ReviewModal from "@/components/review/ReviewModal";
import Host from "./Host";
import Offers from "./Offers";
import Gallery from "./Gallery";
import HotelHeader from "./HotelHeader";

const HotelDetails = ({ hotel }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [userEligible, setUserEligible] = useState(false);
  const [loading, setLoading] = useState(true);
  const openReviewModal = () => setIsReviewModalOpen(true);
  const closeReviewModal = () => setIsReviewModalOpen(false);
  const fetchReviews = useCallback(async () => {
    if (!hotel.hotel.id) return;

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/hotels/${hotel.hotel.id}/reviews`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Reviews:", data);

      setReviews(data.reviews || []);
      setUserEligible(data.userEligible || false);
    } catch (error) {
      console.error("Failed to fetch reviews:", error.message);
    } finally {
      setLoading(false);
    }
  }, [hotel.hotel.id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleReviewSubmit = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
    setUserEligible(false);
  };

  const handleReviewDelete = (reviewId) => {
    setReviews((prev) => prev.filter((review) => review.id !== reviewId));
  };
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <HotelHeader hotel={hotel} reviews={reviews} />

        <Gallery hotel={hotel} />

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <Host hotel={hotel} />

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">About this place</h3>
              <p className="text-gray-700 leading-relaxed">
                {hotel.hotel.description}
              </p>
            </div>

            <Offers hotel={hotel} />
          </div>

          <CheckInOutForm hotel={hotel} />
        </div>
      </div>

      <Reviews
        hotel={hotel}
        openReviewModal={openReviewModal}
        reviews={reviews}
        userEligible={userEligible}
        onDeleteReview={handleReviewDelete}
      />
      <ReviewModal
        isVisible={isReviewModalOpen}
        onClose={closeReviewModal}
        onSubmit={handleReviewSubmit}
        hotelId={hotel.hotel.id}
      />
    </>
  );
};

export default HotelDetails;
