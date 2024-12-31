"use client";
import Link from "next/link";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const CheckInOutForm = ({ hotel }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
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
          <input type="number" placeholder="Guests" className="w-full p-3" />
        </div>

        <Link
          href="/payment"
          className="w-full block text-center bg-primary text-white py-3 rounded-lg transition-all hover:brightness-90"
        >
          Reserve
        </Link>

        <div className="text-center mt-4 text-gray-600">
          <p>You won&apos;st be charged yet</p>
        </div>
      </div>
    </div>
  );
};

export default CheckInOutForm;
