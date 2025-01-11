import LoginForm from "@/components/auth/LoginForm";
import SocialLogin from "@/components/auth/SocialLogin";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className=" bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl  w-96 p-6 relative shadow-black/50">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Log in to Hotel Booking
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Welcome back! Let&apos;s get you signed in.
          </p>
        </div>
        <SocialLogin />
        <LoginForm />
        <div className="text-center text-sm text-gray-600 mt-2">
          <p>
            Don&apos;t have an account? Please
            <Link
              href="/register"
              className="text-primary hover:underline ml-2"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
