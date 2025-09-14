"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      setIsVerifying(true);
      // Simulate verification process
      setTimeout(() => {
        setIsVerifying(false);
        setIsVerified(true);
      }, 2000);
    }
  };

  const handleResendCode = () => {
    // Handle resend logic here
    console.log("Resending OTP code");
  };

  return (
    <div className="w-full flex flex-col mx-auto items-center justify-center p-8 lg:p-12 lg:mt-24">
      <div className="w-full space-y-8 items-center flex flex-col">
        {/* Header */}
        <div className="space-y-2 items-center flex flex-col">
          <h1 className="text-3xl font-bold text-[#040308]">
            Verify Your Email
          </h1>
          <p className="text-gray-600">
            {isVerified
              ? "Your email has been successfully verified!"
              : "We've sent a 6-digit code to user@email.com. Please enter it below to continue."}
          </p>
        </div>

        {/* Form */}
        <form
          className="space-y-6 items-center flex flex-col"
          onSubmit={handleSubmit}
        >
          {!isVerified ? (
            <>
              {/* OTP Input */}
              <div className="space-y-4">
                <div className="flex justify-center gap-3">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup>
                      {Array.from({ length: 6 }).map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="w-12 h-12 text-lg mr-1 border-2 border-gray-300 rounded-md focus:border-gray-600"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              <Button
                type="submit"
                disabled={otp.length !== 6 || isVerifying}
                className="w-fit h-12 bg-green-700 mx-5 hover:bg-green-800 text-white font-semibold disabled:opacity-50"
              >
                {isVerifying ? "Verifying..." : "Verify"}
              </Button>
              <p className="text-[#61738A] items-center gap-2">
                Didn't receive it? Resend code in 30s
              </p>
              {/*<div className="text-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResendCode}
                  className="text-[#312ECB] border-[#312ECB] hover:bg-[#312ECB] hover:text-white"
                >
                  Resend Code
                </Button>
              </div> */}
            </>
          ) : (
            <div className="space-y-4">
              <div className="bg-[#e6e6ff] w-full rounded-md p-5 flex flex-col items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600 mb-3" />
                <p className="text-lg font-semibold text-center mb-2">
                  Email Verified Successfully!
                </p>
                <p className="text-base text-center text-gray-600">
                  You can now access your account and start shopping.
                </p>
              </div>

              <Button
                asChild
                className="w-full h-12 bg-green-700 hover:bg-green-800 text-white font-semibold"
              >
                <Link href="/login">Continue to Login</Link>
              </Button>
            </div>
          )}

          {/* Back to Login Link */}
          <div className="flex justify-center items-center">
            <Link
              href={"/signup"}
              className="text-[#61738A] flex items-center gap-2"
            >
              Back to sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
