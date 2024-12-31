import Image from "next/image";
import React from "react";
import CheckInOutForm from "./CheckInOutForm";
import Reviews from "./Reviews";

const HotelDetails = ({ hotel }) => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{hotel.hotel.name}</h1>
          <div className="flex items-center text-gray-600">
            <i className="fas fa-star text-yellow-500 mr-1"></i>
            <span>5 · </span>
            <span className="ml-2">{hotel.hotel.reviewsNo} reviews</span>
            <span className="mx-2">·</span>
            <span className="">{hotel.hotel.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-4 grid-rows-2 gap-4 mb-8 h-[500px] ">
          <div className="col-span-2 row-span-2">
            <Image
              src={hotel.hotel.image}
              alt={hotel.name}
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          {hotel?.hotel?.images?.map((image, index) => (
            <div key={index}>
              <Image
                src={image}
                alt={hotel?.hotel?.name}
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
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

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">About this place</h3>
              <p className="text-gray-700 leading-relaxed">
                {hotel.hotel.description}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">
                What this place offers
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {hotel.hotel.offers?.map((offer, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <i className="fa-solid fa-umbrella-beach"></i>
                    <span>{offer}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <CheckInOutForm hotel={hotel} />
        </div>
      </div>

      <Reviews hotel={hotel} />
    </>
  );
};

export default HotelDetails;
