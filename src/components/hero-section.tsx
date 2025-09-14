"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DynamicButton } from "@/components/ui/dynamic-button";
import { ArrowRight, Star } from "lucide-react";
import { SectionContainer } from "@/components/ui/section-container";
import Image from "next/image";

// Dynamic content interface - can be managed from admin
interface HeroContent {
  welcomeText: string;
  mainHeadline: string;
  description: string;
  shopNowText: string;
  viewCategoriesText: string;
  summerSaleText: string;
  summerSaleDiscount: string;
  summerSaleDescription: string;
  bestDealText: string;
  bestDealDescription: string;
}

// Default content - can be overridden from admin
const defaultHeroContent: HeroContent = {
  welcomeText: "WELCOME TO ENDELLA",
  mainHeadline: "Your Premium Destination for Beauty & Skincare",
  description:
    "Discover our curated collection of high-quality makeup, skincare, and beauty products — delivered with care to enhance your natural beauty.",
  shopNowText: "Shop now",
  viewCategoriesText: "View Categories",
  summerSaleText: "BEAUTY SALE",
  summerSaleDiscount: "50% OFF",
  summerSaleDescription: "Selected Skincare & Makeup",
  bestDealText: "BEST DEAL",
  bestDealDescription: "Premium Beauty Collection",
};

export function HeroSection({
  content = defaultHeroContent,
}: {
  content?: Partial<HeroContent>;
}) {
  // Merge default content with provided content
  const heroContent = { ...defaultHeroContent, ...content };

  // Animation trigger
  const [startAnimation, setStartAnimation] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    // Start animation after a short delay to ensure loading is complete
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-2 lg:py-4 xl:py-6 overflow-hidden"
    >
      <SectionContainer maxWidth="1440" padding="sm">
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-6 xl:gap-8 items-stretch">
          {/* Left content - Main Hero */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={
              startAnimation ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
            }
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative rounded-2xl flex flex-col justify-between min-h-[400px] lg:min-h-[500px] h-full lg:col-span-8"
          >
            {/* Background Image */}
            <div className="absolute inset-0 -z-10 rounded-2xl">
              <Image
                src="/placeholder.webp"
                alt="Hero Background"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>

            {/* Content Container */}
            <div className="relative w-full lg:w-[70%] xl:w-[80%] z-10 flex flex-col justify-center flex-1 p-6 lg:p-8">
              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={
                  startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="text-xs lg:text-sm font-medium text-[var(--primary)] uppercase tracking-wide mb-1"
              >
                {heroContent.welcomeText}
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={
                  startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                }
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                className="text-2xl md:text-2xl lg:text-3xl xl:text-5xl font-semibold text-foreground leading-tight mb-4"
              >
                {heroContent.mainHeadline}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={
                  startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                className="text-xs lg:text-sm text-[#808080] max-w-lg"
              >
                {heroContent.description}
              </motion.p>
              {/* Shop Now Button */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={
                  startAnimation
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 30, scale: 0.9 }
                }
                transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
                className="relative z-10 pt-6 lg:pt-8"
              >
                <DynamicButton
                  size="lg"
                  bgColor="bg-white"
                  textColor="text-[var(--primary)]"
                  icon={<ArrowRight className="h-4 w-4" />}
                  iconPosition="after"
                  hoverBgColor="hover:bg-[var(--primary)]"
                  hoverTextColor="hover:text-white"
                  className="shadow-sm group"
                >
                  {heroContent.shopNowText}
                </DynamicButton>
              </motion.div>
            </div>
          </motion.div>

          {/* Right content - Promotional cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={
              startAnimation ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
            }
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 lg:grid-rows-2 lg:grid-cols-1 gap-2 lg:gap-4 h-full lg:col-span-4"
          >
            {/* Summer Sale Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={
                startAnimation
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 40, scale: 0.95 }
              }
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <div className="rounded-2xl p-6 lg:p-8 relative overflow-hidden h-full">
                {/* Background Image */}
                <div className="absolute inset-0 -z-10">
                  <Image
                    src="/placeholder2.jpeg"
                    alt="Summer Sale Background"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="text-start relative z-10 h-full flex flex-col">
                  <div className="inline-block bg-accent text-accent-foreground rounded-full text-sm mb-1 font-medium capitalize">
                    {heroContent.summerSaleText}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-semibold text-[#1A1A1A] capitalize mb-2">
                    {heroContent.summerSaleDiscount}
                  </h3>
                  <p className="text-[#666666] text-xs lg:text-sm mb-4">
                    {heroContent.summerSaleDescription}
                  </p>

                  {/* Transparent Shop Now Button */}
                  <DynamicButton
                    size="lg"
                    bgColor="bg-transparent"
                    textColor="text-[var(--primary)]"
                    icon={<ArrowRight className="h-4 w-4" />}
                    iconPosition="after"
                    hoverBgColor="hover:bg-[var(--primary)]"
                    hoverTextColor="hover:text-white"
                    className="w-fit"
                  >
                    {heroContent.shopNowText}
                  </DynamicButton>
                </div>
              </div>
            </motion.div>

            {/* Best Deal Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={
                startAnimation
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 40, scale: 0.95 }
              }
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="rounded-2xl p-6 lg:p-6 xl:p-8 shadow-sm relative overflow-hidden h-full">
                {/* Background Image */}
                <div className="absolute inset-0 -z-10">
                  <Image
                    src="/hero/banner04.svg"
                    alt="Best Deal Background"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="mx-auto text-center">
                  <div className="text-center space-y-4 relative z-10 h-full flex flex-col justify-center items-center">
                    <div className="inline-block text-white px-4 py-2 rounded-full text-sm font-medium capitalize">
                      {heroContent.bestDealText}
                    </div>
                    <h3 className="text-xl lg:text-3xl xl:text-3xl font-semibold text-white">
                      {heroContent.bestDealDescription}
                    </h3>

                    {/* Transparent Shop Now Button */}
                    <DynamicButton
                      size="lg"
                      bgColor="bg-transparent"
                      textColor="text-[var(--primary)]"
                      icon={<ArrowRight className="h-4 w-4" />}
                      iconPosition="after"
                      hoverBgColor="hover:bg-white"
                      hoverTextColor="hover:text-[var(--primary)]"
                      className="w-fit"
                    >
                      {heroContent.shopNowText}
                    </DynamicButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </SectionContainer>
    </section>
  );
}
