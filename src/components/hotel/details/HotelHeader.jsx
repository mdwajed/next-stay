const HotelHeader = ({ hotel, reviews }) => {
  console.log("header reviews:", hotel.hotel.reviews);
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-2">{hotel.hotel.name}</h1>
      <div className="flex items-center text-gray-600">
        <i className="fas fa-star text-yellow-500 mr-1"></i>
        <span>
          {reviews.length
            ? (
                reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
              ).toFixed(1)
            : 0}
          ·
        </span>
        <span className="ml-2">{hotel.hotel.reviews.length} reviews</span>
        <span className="mx-2">·</span>
        <span className="">{hotel.hotel.name}</span>
      </div>
    </div>
  );
};

export default HotelHeader;
