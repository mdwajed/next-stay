import ReviewForm from "./ReviewForm";

const ReviewModal = ({ isVisible, onClose, onSubmit, hotelId }) => {
  console.log("hotelid:", hotelId);
  if (!isVisible) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      id="reviewModal"
    >
      <div className="bg-white rounded-2xl w-full max-w-xl mx-4 overflow-hidden">
        <div className="border-b p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Write a review</h3>
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={onClose}
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        <ReviewForm onSubmit={onSubmit} hotelId={hotelId} />
      </div>
    </div>
  );
};

export default ReviewModal;
