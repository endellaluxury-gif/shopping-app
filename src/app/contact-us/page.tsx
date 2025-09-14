import ContactUs from "@/components/features/ContactUs/ContactUs";
import BreadCrumb from "@/components/features/header/BreadCrumb";
import React from "react";

const ContactUsPage = () => {
  return (
    <div>
      <BreadCrumb title="Contact Us" />
      <ContactUs />
    </div>
  );
};

export default ContactUsPage;
