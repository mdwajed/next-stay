"use client";
import { formatDateRange } from "@/lib/formateDate";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BillPayment from "./BillPayment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

const PaymentProcess = () => {
  const [reservationDetails, setReservationDetails] = useState({});
  const [dateEditing, setDateEditing] = useState(false);
  const [guestEditing, setGuestEditing] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState({});
  const router = useRouter();
  // Load reservation details from localStorage
  useEffect(() => {
    const storedDetails = localStorage.getItem("reservationDetails");
    if (storedDetails) {
      const parsedDetails = JSON.parse(storedDetails);
      if (parsedDetails.checkInDate) {
        parsedDetails.checkInDate = new Date(
          parsedDetails.checkInDate,
        ).toISOString();
      }
      if (parsedDetails.checkOutDate) {
        parsedDetails.checkOutDate = new Date(
          parsedDetails.checkOutDate,
        ).toISOString();
      }

      setReservationDetails(parsedDetails);
      setUpdatedDetails(parsedDetails);
    }
  }, []);

  const handleEditDateToggle = () => setDateEditing(!dateEditing);

  const handleEditGuestToggle = () => setGuestEditing(!guestEditing);

  const handleSaveChanges = () => {
    setReservationDetails(updatedDetails);
    localStorage.setItem("reservationDetails", JSON.stringify(updatedDetails));
    setDateEditing(false);
    setGuestEditing(false);
  };

  const nights = Math.max(
    Math.ceil(
      (new Date(updatedDetails.checkOutDate) -
        new Date(updatedDetails.checkInDate)) /
        (1000 * 60 * 60 * 24),
    ),
    0,
  );
  const calculatePrice = () => {
    if (!updatedDetails.checkInDate || !updatedDetails.checkOutDate) {
      return { nights: 0, total: 0 };
    }
    const nights = Math.max(
      Math.ceil(
        (new Date(updatedDetails.checkOutDate) -
          new Date(updatedDetails.checkInDate)) /
          (1000 * 60 * 60 * 24),
      ),
      0,
    );
    const nightlyRate = reservationDetails.hotel?.pricePerNight || 0;
    const cleaningFee = 17.5;
    const serviceFee = 51.31;

    return {
      nights,
      total: nights * nightlyRate + cleaningFee + serviceFee,
      cleaningFee,
      serviceFee,
    };
  };
  console.log("Check-in Date:", updatedDetails.checkInDate);
  console.log("Check-out Date:", updatedDetails.checkOutDate);
  console.log("Billing reservationdetails:", reservationDetails);

  const priceDetails = calculatePrice();
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <Link href="/details" className="text-zinc-800 hover:underline">
          <i className="fas fa-chevron-left mr-2"></i>
          Request to book
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Your trip</h2>

            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-medium">Dates</h3>
                {!dateEditing ? (
                  <p className="text-zinc-600 text-sm">
                    {formatDateRange(
                      updatedDetails.checkInDate
                        ? new Date(updatedDetails.checkInDate)
                        : null,
                      updatedDetails.checkOutDate
                        ? new Date(updatedDetails.checkOutDate)
                        : null,
                    ) || "No dates selected"}
                  </p>
                ) : (
                  <div className="space-y-2">
                    <DatePicker
                      selected={
                        updatedDetails.checkInDate
                          ? new Date(updatedDetails.checkInDate)
                          : new Date()
                      }
                      onChange={(date) =>
                        date
                          ? setUpdatedDetails({
                              ...updatedDetails,
                              checkInDate: date.toISOString(),
                            })
                          : null
                      }
                      className="p-2 border rounded-lg w-full"
                    />
                    <DatePicker
                      selected={
                        updatedDetails.checkOutDate
                          ? new Date(updatedDetails.checkOutDate)
                          : new Date()
                      }
                      onChange={(date) =>
                        date
                          ? setUpdatedDetails({
                              ...updatedDetails,
                              checkOutDate: date.toISOString(),
                            })
                          : null
                      }
                      className="p-2 border rounded-lg w-full"
                    />
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleEditDateToggle}
                  className="text-zinc-800 underline text-sm"
                >
                  {dateEditing ? "Cancel" : "Edit"}
                </button>
                <div>
                  {dateEditing && (
                    <button
                      onClick={handleSaveChanges}
                      className="text-zinc-800 underline text-sm"
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Guests</h3>
                {!guestEditing ? (
                  <p className="text-zinc-600 text-sm">
                    {reservationDetails.guests}
                    {reservationDetails.guests === "1" ? "guest" : "guests"}
                  </p>
                ) : (
                  <input
                    type="number"
                    min="1"
                    value={updatedDetails.guests}
                    onChange={(e) =>
                      setUpdatedDetails({
                        ...updatedDetails,
                        guests: e.target.value,
                      })
                    }
                    className="p-2 border rounded-lg w-16"
                  />
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleEditGuestToggle}
                  className="text-zinc-800 underline text-sm"
                >
                  {guestEditing ? "Cancel" : "Edit"}
                </button>
                <div>
                  {guestEditing && (
                    <button
                      onClick={handleSaveChanges}
                      className="text-zinc-800 underline text-sm"
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
          {/* payment process */}
          {/* <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Pay with American Express
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Card number"
                className="w-full p-3 border rounded-lg"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Expiration"
                  className="p-3 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="p-3 border rounded-lg"
                />
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Billing address</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Street address"
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Apt or suite number"
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                placeholder="City"
                className="w-full p-3 border rounded-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="State"
                  className="p-3 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="ZIP code"
                  className="p-3 border rounded-lg"
                />
              </div>
            </div>
          </section>

          <button
            onClick={handlePayment}
            className="w-full block text-center bg-primary text-white py-3 rounded-lg mt-6 hover:brightness-90"
          >
            Request to book
          </button> */}
          <Elements stripe={stripePromise}>
            <BillPayment
              reservationDetails={reservationDetails}
              priceDetails={priceDetails}
            />
          </Elements>
        </div>

        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8 sticky top-0">
            <div className="flex items-start gap-4 mb-6">
              <Image
                src={reservationDetails.hotel?.image}
                alt="Property"
                width={80}
                height={80}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <p className="text-xl font-semibold">
                  {reservationDetails.hotel?.name}
                </p>
                <p className="text-base ">Plan to stay {nights} nights</p>
                <div className="flex items-center">
                  <i className="fas fa-star text-yellow-500 text-sm mr-1"></i>
                  <span className="text-xs mt-1 text-zinc-500">
                    {reservationDetails.hotel?.rating} (
                    {reservationDetails.hotel?.reviewsNo} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-4">Price details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>
                    ${reservationDetails.hotel?.pricePerNight} x{" "}
                    {priceDetails.nights} nights
                  </span>
                  <span>
                    $
                    {priceDetails.nights *
                      reservationDetails.hotel?.pricePerNight || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Cleaning fee</span>
                  <span>$17.50</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>$51.31</span>
                </div>
                <div className="flex justify-between font-semibold pt-3 border-t">
                  <span>Total (USD)</span>
                  <span>{priceDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcess;
