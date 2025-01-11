import RegisterForm from "@/components/auth/RegisterForm";
import SocialLogin from "@/components/auth/SocialLogin";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className=" bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl  w-96 p-6 relative shadow-black/50">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Sign in to Hotel Booking
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Welcome back! Let&apos;s get you signed in.
          </p>
        </div>

        <div className="space-y-4 mb-4">
          <SocialLogin />

          <RegisterForm />
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>
            Have an account? Please
            <Link href="/login" className="text-primary hover:underline ml-2">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
