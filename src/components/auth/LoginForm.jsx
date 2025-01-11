"use client";
import { logIn } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const formData = new FormData(e.currentTarget);

      const response = await logIn(formData);
      if (!!response.error) {
        console.error(response.error);
        setError(response.error.message);
      } else {
        router.push("/");
      }
    } catch (e) {
      console.error(e);
      setError("Check your Credentials");
    }
  };
  return (
    <>
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500 text-sm">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {error && <p className="mb-4 text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          type="submit"
          className="w-full bg-primary text-white rounded-full py-3 hover:bg-primary transition"
        >
          Continue
        </button>
      </form>
    </>
  );
};

export default LoginForm;
