import Image from "next/image";
import React from "react";

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

          <div>
            <div className="bg-white shadow-lg rounded-xl p-6 border">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-xl font-bold">
                    ${hotel.hotel.pricePerNight}
                  </span>
                  <span className="text-gray-600 ml-1">per night</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-star text-yellow-500 mr-1"></i>
                  <span>{hotel.hotel.rating}</span>
                </div>
              </div>

              <div className="border rounded-lg mb-4">
                <div className="grid grid-cols-2 border-b">
                  <input
                    type="text"
                    placeholder="Check in"
                    className="p-3 border-r"
                  />
                  <input type="text" placeholder="Check out" className="p-3" />
                </div>
                <input
                  type="number"
                  placeholder="Guests"
                  className="w-full p-3"
                />
              </div>

              <a
                href="./paymentProcess.html"
                className="w-full block text-center bg-primary text-white py-3 rounded-lg transition-all hover:brightness-90"
              >
                Reserve
              </a>

              <div className="text-center mt-4 text-gray-600">
                <p>You won&apos;st be charged yet</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 border-t">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold">Reviews</h2>
            <div className="flex items-center">
              <i className="fas fa-star text-yellow-500 mr-2"></i>
              <span className="text-xl font-semibold">
                {hotel.hotel.rating}
              </span>
              <span className="mx-2">·</span>
              <span className="text-gray-600">
                {hotel.hotel.reviewsNo} reviews
              </span>
            </div>
          </div>

          <a
            href="./ReviewModal.html"
            className="px-4 py-2 border border-gray-900 rounded-lg hover:bg-gray-100"
          >
            Write a Review
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden ">
                <Image
                  src="/api/placeholder/48/48"
                  alt="User avatar"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">John Doe</h4>
                <p className="text-gray-500 text-sm">December 2024</p>
              </div>
            </div>
            <div className="flex items-center">
              <i className="fas fa-star text-yellow-500"></i>
              <i className="fas fa-star text-yellow-500"></i>
              <i className="fas fa-star text-yellow-500"></i>
              <i className="fas fa-star text-yellow-500"></i>
              <i className="fas fa-star text-yellow-500"></i>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {hotel.hotel.reviews}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                <Image
                  src="/api/placeholder/48/48"
                  width={48}
                  height={48}
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">Emma Wilson</h4>
                <p className="text-gray-500 text-sm">November 2024</p>
              </div>
            </div>
            <div className="flex items-center">
              <i className="fas fa-star text-yellow-500"></i>
              <i className="fas fa-star text-yellow-500"></i>
              <i className="fas fa-star text-yellow-500"></i>
              <i className="fas fa-star text-yellow-500"></i>
              <i className="fas fa-star text-yellow-500"></i>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {hotel.hotel.reviews}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelDetails;
