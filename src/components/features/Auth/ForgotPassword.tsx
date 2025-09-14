"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MailIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ForgotPassword = () => {
  return (
    <div className="w-full flex max-w-[700px] mx-auto items-center justify-center p-8 lg:p-12">
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
          <h1 className="text-3xl font-bold text-[#040308]">Forgot Password</h1>
          <p className="text-gray-600">
            Enter your email address to reset your password
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="Email"
              className="h-12 border-gray-400 focus:border-gray-600 placeholder:text-gray-400"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-green-700 hover:bg-green-800 text-white font-semibold"
          >
            Reset Password
          </Button>
          <div className="bg-[#e6e6ff] mt-5 w-full rounded-md p-5 flex flex-col items-center justify-center">
            <MailIcon />
            <p className="text-base mt-1">
              We&apos;ll send you an email with password reset instructions
            </p>
          </div>

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

export default ForgotPassword;
