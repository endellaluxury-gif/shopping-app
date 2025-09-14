import { SectionContainer } from "@/components/ui/section-container";
import React from "react";

const Subscription = () => {
  return (
    <SectionContainer className="mt-10 max-w-[1140px] w-full mx-auto">
      <div className="w-full h-full lg:min-h-[360px] bg-[url('/aboutus/subscription.png')] rounded-xl bg-cover bg-center flex flex-col items-center justify-center gap-5">
        <h3 className="font-bold text-white text-[32px] text-center max-w-[400px]">
          Groceries Made Simple Straight to Your Door
        </h3>
        <p className="font-medium text-white text-[16px] max-w-[80%] mx-auto text-center">
          Get fresh Afro-Caribbean food, exclusive deals, and product updates.
          Delivered with love
        </p>
        <div className="flex w-full max-w-md bg-white overflow-hidden rounded-full shadow mb-4">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
          />
          <button className="px-6 bg-green-600 rounded-l-3xl text-white font-semibold hover:bg-green-700 transition">
            Subscribe
          </button>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Subscription;
