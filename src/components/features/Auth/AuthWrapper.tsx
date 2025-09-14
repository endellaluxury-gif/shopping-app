import Image from "next/image";
import React from "react";

const AuthWrapper = ({
  children,
  bannerImage,
}: {
  children: React.ReactNode;
  bannerImage?: string;
}) => {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block fixed top-0 left-0 h-screen min-w-[38%]">
        <Image
          src={bannerImage ?? "/auth/signup.png"}
          alt="Banner image"
          fill
          className="w-full object-cover"
          priority
        />
        {/* Testimonial Overlay */}
        <div className="absolute bottom-8 left-8 right-8 bg-[#D9D9D9]/25 backdrop-blur-sm rounded-lg p-6 text-white">
          <div className="mb-4">
            <p className="text-sm leading-relaxed mb-4">
              &quot;As a business owner, I appreciate the wholesale pricing and
              quality products that Pride of Africa offers. Their B2B platform
              has made ordering supplies much easier.&quot;
            </p>
          </div>
          <div>
            <p className="font-semibold">David Osei</p>
            <p className="text-sm text-gray-300">African Delights Market</p>
          </div>
        </div>
      </div>
      {/*Right side */}
      <div className="flex-1 lg:ml-[38%] w-full mx-auto min-h-screen overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default AuthWrapper;
