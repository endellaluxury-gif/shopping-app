"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeOff, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
  };

  return (
    <div className="w-full mx-auto max-w-[700px] flex items-center justify-center p-8 lg:p-12">
      <div className="w-full space-y-8">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/brands/poa.png"
            width={120}
            height={100}
            alt="Logo"
            // className="w-16 h-fit"
            priority
          />
        </div>

        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Email</label>
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="h-12 border-gray-400 focus:border-gray-600 placeholder:text-gray-400"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="h-12 border-gray-400 focus:border-gray-600 placeholder:text-gray-400 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-end items-end mt-[-10px]">
            <Link
              href={"/forgot-password"}
              className="underline text-[#312ECB] text-end"
            >
              Forgot Password
            </Link>
          </div>
          {/* Sign In Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-green-700 hover:bg-green-800 text-white font-semibold"
          >
            Sign In
          </Button>

          {/* Sign Up Link */}
          <div className="text-center">
            <span className="text-sm text-gray-900">
              Don't have an account?{" "}
              <Link href="/signup" className="underline text-[#312ECB]">
                Sign up
              </Link>
            </span>
          </div>

          {/* Divider */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 h-px bg-gray-400"></div>
            <span className="text-gray-900">or</span>
            <div className="flex-1 h-px bg-gray-400"></div>
          </div>

          {/* Google Sign In */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 border-gray-900 text-gray-900 hover:bg-gray-50 font-semibold"
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 20 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_8035_25582)">
                <path
                  d="M19.3123 9.71943C19.3123 9.07365 19.2599 8.42437 19.1482 7.78906H10.1875V11.4473H15.3189C15.1059 12.6272 14.4218 13.6709 13.4199 14.3342V16.7079H16.4813C18.279 15.0533 19.3123 12.6097 19.3123 9.71943Z"
                  fill="#4285F4"
                />
                <path
                  d="M10.1926 18.9999C12.7548 18.9999 14.9155 18.1586 16.4898 16.7065L13.4285 14.3328C12.5767 14.9123 11.4771 15.2404 10.1961 15.2404C7.71764 15.2404 5.61623 13.5683 4.86223 11.3203H1.70312V13.7673C3.31584 16.9753 6.60061 18.9999 10.1926 18.9999Z"
                  fill="#34A853"
                />
                <path
                  d="M4.85368 11.3226C4.45573 10.1427 4.45573 8.86514 4.85368 7.68528V5.23828H1.69806C0.350645 7.92265 0.350645 11.0852 1.69806 13.7696L4.85368 11.3226Z"
                  fill="#FBBC04"
                />
                <path
                  d="M10.1926 3.76015C11.547 3.7392 12.856 4.24885 13.8369 5.18436L16.5492 2.47207C14.8317 0.859358 12.5523 -0.0272856 10.1926 0.000640194C6.60061 0.000640194 3.31584 2.02526 1.70312 5.23672L4.85874 7.68372C5.60924 5.4322 7.71415 3.76015 10.1926 3.76015Z"
                  fill="#EA4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_8035_25582">
                  <rect
                    width="19"
                    height="19"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            Continue with Google
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
