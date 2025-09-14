import { SectionContainer } from "@/components/ui/section-container";
import { ChevronRight, House } from "lucide-react";
import Link from "next/link";
import React from "react";

const BreadCrumb = ({ title }: { title: string }) => {
  return (
    <div className="w-full bg-[#f2f4f5]">
      <SectionContainer maxWidth="1440" padding="sm" as="div" className="!py-0">
        <div className="flex items-center gap-4 py-6">
          <Link href={"/"} className="flex items-center gap-2">
            <House className="text-gray-600" />
            <p className="text-gray-600 font-medium text-base">Home</p>
          </Link>
          <ChevronRight className="text-gray-600" />
          <p className="text-[#34A853] text-base font-medium">{title}</p>
        </div>
      </SectionContainer>
    </div>
  );
};

export default BreadCrumb;
