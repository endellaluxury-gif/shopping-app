"use client"

import { motion } from "framer-motion"
import { DynamicButton } from "@/components/ui/dynamic-button"
import { ArrowRight } from "lucide-react"
import { SectionContainer } from "@/components/ui/section-container"

const promotionalBanners = [
  {
    id: 1,
    title: "Grab a Drink",
    subtitle: "DRINKS & MORE",
    description: "Your one-stop shop for soft drinks, malts, and alcoholic favorites.",
    buttonText: "Shop Now",
    image: "/coke.png",
    contentPosition: "right",
    bgGradient: "linear-gradient(180deg, #E0F2FE 0%, #FFFFFF 100%)",
  },
  {
    id: 2,
    title: "Shop Our Best Sellers",
    subtitle: "BEST SELLER",
    description: "Don't miss what everyone's buying — tried, trusted, and restocked for a reason.",
    buttonText: "Shop Now",
    image: "/shop.png",
    contentPosition: "left",
    bgColor: "#2563EB",
  },
]

export function PromotionalDuo() {
  return (
    <section className="py-4 lg:py-8">
      <SectionContainer maxWidth="1440" padding="sm">
        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6">
          {promotionalBanners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative rounded-2xl overflow-hidden h-80 lg:h-96"
              style={{ 
                background: banner.bgGradient || banner.bgColor,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Overlay */}
              <div className={`absolute inset-0 ${
                banner.contentPosition === 'left' 
                  ? 'flex items-center justify-start pl-6 lg:pl-8' 
                  : 'grid grid-cols-2'
              }`}>
                {banner.contentPosition === 'left' ? (
                  // Left banner: simple left positioning
                  <div className="max-w-xs lg:max-w-sm text-left">
                    <p className="text-xs font-medium text-white/80 mb-2 uppercase tracking-wide">
                      {banner.subtitle}
                    </p>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
                      {banner.title}
                    </h3>
                    <p className="text-sm xl:text-base text-white/80 mb-6 leading-relaxed">
                      {banner.description}
                    </p>
                    
                    <DynamicButton
                      size="sm"
                      bgColor="bg-[var(--primary)]"
                      textColor="text-white"
                      icon={<ArrowRight className="h-4 w-4" />}
                      iconPosition="after"
                      className="group"
                    >
                      {banner.buttonText}
                    </DynamicButton>
                  </div>
                ) : (
                  // Right banner: 2-column grid overlay
                  <>
                    <div className=""></div> {/* Empty left column */}
                    <div className="flex items-center justify-center p-2 lg:p-4 xl:p-8">
                      <div className="max-w-xs lg:max-w-sm text-left">
                        <p className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wide">
                          {banner.subtitle}
                        </p>
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                          {banner.title}
                        </h3>
                        <p className="text-sm xl:text-base text-gray-600 mb-6 leading-relaxed">
                          {banner.description}
                        </p>
                        
                        <DynamicButton
                          size="sm"
                          bgColor="bg-[var(--primary)]"
                          textColor="text-white"
                          icon={<ArrowRight className="h-4 w-4" />}
                          iconPosition="after"
                          className="group"
                        >
                          {banner.buttonText}
                        </DynamicButton>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}
