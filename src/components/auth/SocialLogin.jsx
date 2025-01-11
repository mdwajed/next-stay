import { doSignIn } from "@/app/actions";
import React from "react";
import { GoogleIcon } from "../svg/Svg";

const SocialLogin = () => {
  return (
    <form action={doSignIn}>
      <button
        type="submit"
        className="w-full flex items-center justify-center border border-gray-300 rounded-full mb-4 py-3 hover:bg-gray-50 transition"
      >
        <GoogleIcon />
        Continue with Google
      </button>
    </form>
  );
};

export default SocialLogin;
