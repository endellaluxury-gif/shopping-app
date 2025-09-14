import { SectionContainer } from "@/components/ui/section-container";
import React from "react";
import { BrandsData } from "./BrandsData";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Brands = () => {
  return (
    <SectionContainer>
      <h1 className="text-[26px] lg:text-[32px] font-bold">Shop By Brands</h1>
      <div className="mt-10 mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {BrandsData.map((res) => (
          <div
            key={res.id}
            className="border border-gray-300 shadow-xl rounded-lg py-5 px-3 flex flex-col items-center justify-center gap-5"
          >
            <Image
              alt={res.title}
              src={res.image}
              width={130}
              height={100}
              className="h-[110px] object-contain"
            />
            <div className="w-full text-center">
              <h2 className="text-[24px] font-semibold">{res.title}</h2>
              <p className="mt-2 text-[14px] italic">{res.subtitle}</p>
            </div>
            <Button className="bg-[#34A853] rounded-3xl text-white w-full">
              Shop Now
            </Button>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default Brands;
