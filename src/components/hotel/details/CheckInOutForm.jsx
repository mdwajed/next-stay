"use client";

import { formatDateRange } from "@/lib/formateDate";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const CheckInOutForm = ({ hotel }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState("");
  const router = useRouter();

  const handleReserve = () => {
    if (!checkInDate || !checkOutDate || !guests) {
      alert("Please fill in all fields before proceeding.");
      return;
    }

    // Format dates for display

    const formattedDateRange = formatDateRange(checkInDate, checkOutDate);

    const reservationDetails = {
      dateRange: formattedDateRange,
      guests,
      hotel: {
        pricePerNight: hotel.hotel.pricePerNight,
        image: hotel.hotel.image,
        rating: hotel.hotel.rating,
        reviews: hotel.hotel.reviewsNo,
      },
    };
    console.log("Saved reservationDetails:", reservationDetails);

    localStorage.setItem(
      "reservationDetails",
      JSON.stringify(reservationDetails)
    );

    router.push("/payment");
  };
  return (
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
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              placeholderText="Check in"
              className="p-3 border-r w-full"
            />
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              placeholderText="Check out"
              className="p-3 w-full"
            />
          </div>
          <input
            type="number"
            placeholder="Guests"
            className="w-full p-3"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>

        <button
          onClick={handleReserve}
          className="w-full block text-center bg-primary text-white py-3 rounded-lg transition-all hover:brightness-90"
        >
          Reserve
        </button>

        <div className="text-center mt-4 text-gray-600">
          <p>You won&apos;st be charged yet</p>
        </div>
      </div>
    </div>
  );
};

export default CheckInOutForm;
