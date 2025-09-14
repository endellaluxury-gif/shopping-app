import AboutUs from "@/components/features/AboutUs/AboutUs";
import BreadCrumb from "@/components/features/header/BreadCrumb";
import React from "react";

const AboutUsPage = () => {
  return (
    <div>
      <BreadCrumb title="About Us" />
      <AboutUs />
    </div>
  );
};

export default AboutUsPage;
