"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SectionContainer } from "@/components/ui/section-container";
import { DynamicButton } from "@/components/ui/dynamic-button";

const banners = [
  {
    id: 1,
    title: "Premium Skincare Collection",
    subtitle: "Best Deals",
    buttonText: "Shop Now",
    buttonColor: "#8B5CF6",
    bgGradient: "linear-gradient(90deg, #A78BFA 0%, #8B5CF6 100%)",
    mobileBgGradient: "linear-gradient(90deg, #A78BFA 0%, #8B5CF6 100%)",
    desktopImage:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    mobileImage:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    showImageOnMobile: true,
  },
  {
    id: 2,
    title: "Luxury Makeup Essentials",
    subtitle: "Top Quality",
    buttonText: "Shop Now",
    buttonColor: "#EC4899",
    bgGradient: "linear-gradient(90deg, #F472B6 0%, #EC4899 100%)",
    mobileBgGradient: "linear-gradient(90deg, #F472B6 0%, #EC4899 100%)",
    desktopImage:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    mobileImage:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    showImageOnMobile: true,
  },
  {
    id: 3,
    title: "Natural Beauty Products",
    subtitle: "Summer Sale",
    buttonText: "Shop Now",
    buttonColor: "#059669",
    bgGradient: "linear-gradient(90deg, #10B981 0%, #059669 100%)",
    mobileBgGradient: "linear-gradient(90deg, #10B981 0%, #059669 100%)",
    desktopImage:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2087&q=80",
    mobileImage:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2087&q=80",
    showImageOnMobile: true,
  },
];

export function PromotionalBanners() {
  return (
    <section className="py-4 lg:py-8">
      <SectionContainer maxWidth="1440" padding="sm">
        {/* Mobile: Vertical stacked banners without images */}
        <div className="lg:hidden space-y-4">
          {banners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative rounded-2xl overflow-hidden"
              style={{ background: banner.mobileBgGradient }}
            >
              <div className="p-6 text-left md:text-center">
                <p className="text-sm font-medium text-white/80 mb-2 uppercase">
                  {banner.subtitle}
                </p>
                <h3 className="text-xl  font-bold text-white mb-4">
                  {banner.title}
                </h3>

                <Button
                  size="sm"
                  className="bg-white hover:bg-white/90 transition-all duration-200 rounded-3xl text-xs cursor-pointer"
                  style={{ color: banner.buttonColor }}
                >
                  {banner.buttonText}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: Horizontal banners with background images */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {banners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative rounded-2xl overflow-hidden h-[536px] w-full"
              style={{
                backgroundImage: `url(${banner.desktopImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 p-6 flex flex-col items-center text-center pt-12">
                <div className="text-center mb-8">
                  <p className="text-sm font-medium text-white mb-3 uppercase">
                    {banner.subtitle}
                  </p>
                  <h3 className="text-2xl lg:text-3xl xl:text-4xl font-semibold text-white leading-tight">
                    {banner.title}
                  </h3>
                </div>

                <DynamicButton
                  size="sm"
                  bgColor="bg-white"
                  textColor="text-[var(--primary)]"
                  icon={<ArrowRight className="h-4 w-4" />}
                  iconPosition="after"
                  hoverBgColor="hover:bg-[var(--primary)]"
                  hoverTextColor="hover:text-white"
                  className="group text-xs lg:text-sm"
                >
                  {banner.buttonText}
                </DynamicButton>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
