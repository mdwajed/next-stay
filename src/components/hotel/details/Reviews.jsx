import Image from "next/image";
import Link from "next/link";
import React from "react";

const Reviews = ({ hotel }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 border-t">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold">Reviews</h2>
          <div className="flex items-center">
            <i className="fas fa-star text-yellow-500 mr-2"></i>
            <span className="text-xl font-semibold">{hotel.hotel.rating}</span>
            <span className="mx-2">·</span>
            <span className="text-gray-600">
              {hotel.hotel.reviewsNo} reviews
            </span>
          </div>
        </div>

        <Link
          href="/review"
          className="px-4 py-2 border border-gray-900 rounded-lg hover:bg-gray-100"
        >
          Write a Review
        </Link>
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
          <p className="text-gray-600 leading-relaxed">{hotel.hotel.reviews}</p>
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
          <p className="text-gray-600 leading-relaxed">{hotel.hotel.reviews}</p>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
