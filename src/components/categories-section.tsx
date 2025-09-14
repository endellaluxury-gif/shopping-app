"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeader } from "@/components/ui/section-header";
import { categories } from "@/data/categories";

// Create a simplified categories array for display
const displayCategories = [
  {
    name: "Makeup",
    icon: "💄",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop&crop=center",
  },
  {
    name: "Skincare",
    icon: "🧴",
    image: "/placeholder2.jpeg",
  },
  {
    name: "Hair Care",
    icon: "💇‍♀️",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop&crop=center",
  },
  {
    name: "Fragrance",
    icon: "🌸",
    image: "/placeholder2.jpeg",
  },
  {
    name: "Nail Care",
    icon: "💅",
    image: "/placeholder2.jpeg",
  },
  {
    name: "Tools & Brushes",
    icon: "🖌️",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop&crop=center",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-4 lg:py-8">
      <SectionContainer maxWidth="1440" padding="sm">
        <SectionHeader
          title="Beauty Categories"
          buttonText="View All"
          buttonLink="/categories"
          titleSize="3xl"
          mobileTitleSize="lg"
          className="mb-8"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 xl:gap-6">
          {displayCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer group"
            >
              <Card className="!py-0 overflow-hidden relative transition-all duration-300 border-2 border-transparent bg-white group">
                {/* Snake border effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-500 ease-out group-hover:w-full"></div>
                  <div className="absolute top-0 right-0 w-0.5 h-0 bg-[var(--primary)] transition-all duration-500 ease-out group-hover:h-full delay-100"></div>
                  <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-500 ease-out group-hover:w-full delay-200 origin-left"></div>
                  <div className="absolute bottom-0 left-0 w-0.5 h-0 bg-[var(--primary)] transition-all duration-500 ease-out group-hover:h-full delay-300 origin-top"></div>
                </div>
                {/* Mobile: Small circular image */}
                <div className="md:hidden p-4 text-center">
                  <div className="mb-3">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-2xl">
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-[var(--secondary)] text-sm">
                    {category.name}
                  </h3>
                </div>

                {/* Desktop: Full-width image */}
                <div className="hidden md:block p-3">
                  <div className="relative mb-4">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-[var(--secondary)] text-sm">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
