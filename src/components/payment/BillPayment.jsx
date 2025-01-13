"use client";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

const BillPayment = ({ reservationDetails, priceDetails }) => {
  console.log("Reservation Details:", reservationDetails, priceDetails);
  const stripe = useStripe();
  const elements = useElements();
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    address: {
      line1: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
    },
  });

  // Update billing details for top-level fields
  const handleInputChange = (field, value) => {
    setBillingDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Update nested address fields
  const handleAddressChange = (field, value) => {
    setBillingDetails((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const handlePayment = async () => {
    if (!stripe || !elements) {
      alert("Stripe has not been initialized");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // Create payment intent
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: priceDetails?.total * 100 }), // Amount in cents--reservationDetails?.totalPrice *
      });
      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }
      const { clientSecret } = await response.json();
      if (!clientSecret) {
        throw new Error("Missing clientSecret in response");
      }
      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: billingDetails,
          },
        }
      );

      if (error) {
        alert(`Payment failed: ${error.message}`);
      } else if (paymentIntent?.status === "succeeded") {
        // Store payment details and navigate to success page
        localStorage.setItem(
          "paymentSummary",
          JSON.stringify({
            paymentIntent,
            billingDetails,
            reservationDetails,
            priceDetails,
          })
        );
        window.location.href = "/success";
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Payment Process</h2>

      {/* Card Input Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">
          Pay with American Express
        </h3>
        <div className="p-3 border rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
      </section>

      {/* Billing Address Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Billing Address</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 border rounded-lg"
            value={billingDetails.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
            value={billingDetails.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
          <input
            type="text"
            placeholder="Street Address"
            className="w-full p-3 border rounded-lg"
            value={billingDetails.address.line1}
            onChange={(e) => handleAddressChange("line1", e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              className="p-3 border rounded-lg"
              value={billingDetails.address.city}
              onChange={(e) => handleAddressChange("city", e.target.value)}
            />
            <input
              type="text"
              placeholder="State"
              className="p-3 border rounded-lg"
              value={billingDetails.address.state}
              onChange={(e) => handleAddressChange("state", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Postal Code"
              className="p-3 border rounded-lg"
              value={billingDetails.address.postal_code}
              onChange={(e) =>
                handleAddressChange("postal_code", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Country"
              className="p-3 border rounded-lg"
              value={billingDetails.address.country}
              onChange={(e) => handleAddressChange("country", e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Submit Button */}
      <button
        onClick={handlePayment}
        className="w-full bg-primary text-white py-3 rounded-lg hover:brightness-90"
      >
        Request to Book
      </button>
    </div>
  );
};

export default BillPayment;
