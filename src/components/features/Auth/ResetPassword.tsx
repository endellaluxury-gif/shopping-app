"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeOff, Eye, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
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
          <h1 className="text-3xl font-bold text-[#040308]">Reset Password</h1>
          <p className="text-gray-600">
            Choose a new password for your account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              New Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Your new password"
                className="h-12 border-gray-400 focus:border-gray-600 placeholder:text-gray-400"
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
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm new password"
                className="h-12 border-gray-400 focus:border-gray-600 placeholder:text-gray-400"
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

          <Button
            type="submit"
            className="w-full h-12 bg-green-700 hover:bg-green-800 text-white font-semibold"
          >
            Reset Password
          </Button>

          {/* Sign Up Link */}
          <div className="flex justify-center items-center mt-[-10px]">
            <Link
              href={"/login"}
              className="underline text-[#312ECB] flex items-center gap-2"
            >
              <ArrowLeft />
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
