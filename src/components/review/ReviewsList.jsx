import Image from "next/image";

const ReviewsList = ({ reviews, onDeleteReview, session }) => {
  console.log("review session", session);
  return (
    <div className="grid grid-cols-2 gap-8">
      {reviews.map((review, index) => (
        <>
          <div key={index} className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-gray-400 w-12 h-12 rounded-full  flex items-center justify-center text-xs text-white">
                <i className="fas fa-user text-white"></i>
              </div>
              <div>
                <h4 className="font-medium">{review.reviewerName}</h4>
                <p className="text-gray-500 text-sm">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              {Array.from({
                length: Math.round(review.rating["$numberDouble"] || 0),
              }).map((_, starIndex) => (
                <i key={starIndex} className="fas fa-star text-yellow-500"></i>
              ))}
            </div>
            <p className="text-gray-600 leading-relaxed">{review.reviewText}</p>
            <button
              className="text-red-500 hover:underline"
              onClick={() => onDeleteReview(review.id)}
            >
              Delete Review
            </button>
          </div>
        </>
      ))}
    </div>
  );
};

export default ReviewsList;
