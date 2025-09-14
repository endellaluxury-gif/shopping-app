import Faq from "@/components/features/Faq/Faq";
import BreadCrumb from "@/components/features/header/BreadCrumb";
// import Subscription from "@/components/features/Subscription/Subscription";
import { NewsletterSection } from "@/components/newsletter-section";
import React from "react";

const FAQPage = () => {
  return (
    <div>
      <BreadCrumb title="FAQ" />
      <Faq />
      <NewsletterSection />
    </div>
  );
};

export default FAQPage;
