import React, { useState } from "react";

const ReviewForm = ({ onSubmit, hotelId, onClose }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !reviewText) {
      alert("Rating and review text are required.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/hotels/${hotelId}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rating,
            reviewText,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit review");
      }

      const data = await response.json();
      onSubmit(data.review); // Update parent state with the new review
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error submitting review:", error.message);
      alert(error.message || "Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Overall Rating
            </label>
            <div className="flex gap-2">
              {[...Array(5)].map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Rate ${index + 1} star${index === 0 ? "" : "s"}`}
                  className={`text-2xl ${
                    index < rating ? "text-yellow-500" : "text-gray-300"
                  } hover:text-yellow-500`}
                  onClick={() => setRating(index + 1)}
                >
                  <i className="fas fa-star"></i>
                </button>
              ))}
            </div>
            {rating === 0 && (
              <p className="text-red-500 text-sm mt-2">
                Please select a rating.
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Your Review
            </label>
            <textarea
              rows="4"
              value={reviewText}
              maxLength="500"
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience with other travelers..."
              className="w-full px-4 py-3 rounded-lg border focus:border-gray-500 focus:ring-0 resize-none"
            ></textarea>
            <div className="text-sm text-gray-500 text-right">
              {reviewText.length}/500
            </div>
            {reviewText.trim() === "" && (
              <p className="text-red-500 text-sm mt-2">
                Please write a review.
              </p>
            )}
          </div>
          <div className="border-t p-4 bg-gray-50">
            <div className="flex justify-end gap-4">
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded-lg ${
                  loading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-primary text-white hover:brightness-90"
                }`}
              >
                {loading ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReviewForm;
