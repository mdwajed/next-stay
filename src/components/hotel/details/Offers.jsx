import React from "react";

const Offers = ({ hotel }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
      <div className="grid grid-cols-2 gap-4">
        {hotel.hotel.offers?.map((offer, index) => (
          <div key={index} className="flex items-center gap-2">
            <i className="fa-solid fa-umbrella-beach"></i>
            <span>{offer}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
