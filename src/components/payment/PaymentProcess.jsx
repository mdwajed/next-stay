import Image from "next/image";
import React from "react";

const PaymentProcess = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <a href="/details" className="text-zinc-800 hover:underline">
          <i className="fas fa-chevron-left mr-2"></i>
          Request to book
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Your trip</h2>

            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-medium">Dates</h3>
                <p className="text-zinc-600 text-sm">Jan 3 - 8, 2025</p>
              </div>
              <button className="text-zinc-800 underline text-sm">Edit</button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Guests</h3>
                <p className="text-zinc-600 text-sm">1 guest</p>
              </div>
              <button className="text-zinc-800 underline text-sm">Edit</button>
            </div>
          </section>

          <section className="mb-8">
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

          <a
            href="./success.html"
            className="w-full block text-center bg-primary text-white py-3 rounded-lg mt-6 hover:brightness-90"
          >
            Request to book
          </a>
        </div>

        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8 sticky top-0">
            <div className="flex items-start gap-4 mb-6">
              <Image
                src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Property"
                width={80}
                height={80}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <p className="text-sm">
                  One room and one living room with a straight sea view, 1.8m
                  queen...
                </p>
                <div className="flex items-center">
                  <i className="fas fa-star text-sm mr-1"></i>
                  <span className="text-xs mt-1 text-zinc-500">
                    5.00 (3 Reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-4">Price details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>$59.08 x 5 nights</span>
                  <span>$295.39</span>
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
                  <span>$364.20</span>
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
