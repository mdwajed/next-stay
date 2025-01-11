"use client";

import { registerUser } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const formData = new FormData(e.currentTarget);
      const response = await registerUser(formData);

      if (!response.ok) {
        throw new Error(response.error || "Registration failed.");
      }

      setSuccess(response.message);
      router.push("/login"); // Reset the form
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />

      <input
        type="url"
        name="image"
        placeholder="Photo URL (optional)"
        className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <button
        type="submit"
        className="w-full bg-primary text-white rounded-full py-3 hover:bg-primary-dark transition"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
