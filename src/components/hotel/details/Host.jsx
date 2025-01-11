import React from "react";

const Host = ({ hotel }) => {
  return (
    <div className="border-b pb-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">
        Entire villa hosted by {hotel.hotel.hostName}
      </h2>
      <div className="grid grid-cols-3 gap-4 text-gray-600">
        <div className="flex items-center gap-2">
          <i className="fas fa-person"></i>
          <span>{hotel.hotel.guestAllowed} guests</span>
        </div>
        <div className="flex items-center gap-2">
          <i className="fas fa-door-open"></i>
          <span>{hotel.hotel.bedrooms} bedrooms</span>
        </div>
        <div className="flex items-center gap-2">
          <i className="fas fa-bed"></i>
          <span>{hotel.hotel.beds} beds</span>
        </div>
      </div>
    </div>
  );
};

export default Host;
