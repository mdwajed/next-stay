"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Download from "./Download";
import SendEmail from "./SendEmail";

const SuccessModal = () => {
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const summary = localStorage.getItem("paymentSummary");
    if (summary) {
      setPaymentSummary(JSON.parse(summary));
    }
  }, []);

  if (!paymentSummary) {
    return <p>Loading...</p>;
  }
  const { paymentIntent, billingDetails, reservationDetails, priceDetails } =
    paymentSummary;
  console.log(paymentSummary);
  return (
    <div className="bg-gray-50">
      <div className="max-w-3xl mx-auto p-6">
        <div className="text-center my-12">
          <div className="inline-block p-4 bg-green-100 rounded-full mb-6">
            <i className="fas fa-check-circle text-4xl text-primary"></i>
          </div>
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-zinc-600 mb-8">
            Your booking has been confirmed. Check your email for details.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-start gap-6 mb-6 pb-6 border-b">
            <Image
              src={reservationDetails?.hotel?.image}
              alt="Property"
              width={96}
              height={96}
              className="w-32 h-32 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                {reservationDetails?.hotel?.name}
              </h2>
              <div className="flex items-center mb-2">
                <i className="fas fa-star text-yellow-500 text-sm mr-1"></i>
                <span className="text-sm">
                  {reservationDetails?.hotel?.rating} (
                  {reservationDetails?.hotel?.reviews} reviews)
                </span>
              </div>
              <p className="text-zinc-600">
                One room and one living room with a straight sea view....
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-medium">
            <div>
              <h3 className="font-semibold mb-4">Reservation Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-zinc-600 text-sm">Check-in</span>
                  <span className="font-semibold">
                    {new Date(
                      reservationDetails?.checkInDate
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600 text-sm">Check-out</span>
                  <span className="font-semibold">
                    {new Date(
                      reservationDetails?.checkOutDate
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600 text-sm">Guests</span>
                  <span className="font-semibold">
                    {reservationDetails?.guests} guests
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Payment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-zinc-600">Total amount paid : </span>
                  <span className="font-semibold ">
                    ${priceDetails?.total?.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600 text-sm">payment ID : </span>
                  <span className="font-semibold">{paymentIntent.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-xl font-semibold mb-6">Next Steps</h3>
          <div className="space-y-6">
            <div>
              <SendEmail paymentSummary={paymentSummary} />
            </div>

            <div className="flex gap-4">
              <div className="text-primary">
                <i className="fas fa-comment-alt text-xl"></i>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Message your host</h4>
                <p className="text-zinc-600">
                  Introduce yourself and let them know your travel plans.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-primary">
                <i className="fas fa-suitcase text-xl"></i>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Plan your trip</h4>
                <p className="text-zinc-600">
                  Review house rules and check-in instructions in your trip
                  details.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Download paymentSummary={paymentSummary} />

        <div className="mt-12 text-center">
          <p className="text-zinc-600">Need help with your booking?</p>
          <a href="#" className="text-primary hover:underline">
            Visit our Help Center
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
