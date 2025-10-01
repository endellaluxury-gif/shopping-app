"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeader } from "@/components/ui/section-header";
import { categories } from "@/data/categories";
import Image from "next/image";
import Link from "next/link";

// Map categories data to display format
const displayCategories = categories.map((category) => ({
  name: category.name,
  icon: category.icon,
  image: getCategoryImage(category.name),
}));

// Function to get appropriate images for each category
function getCategoryImage(categoryName: string): string {
  const imageMap: Record<string, string> = {
    "Endella Nature Beauty": "/categories/nature_beauty.jpg",
    "EDL SHIRTS / VALID SET":
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop&crop=center",
    SHORTS: "/categories/shorts.avif",
    "EDL SPECIAL":
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop&crop=center",
    "EDL ROYALTY":
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop&crop=center",
    "JACKET / HOODIE": "/categories/hoodie.jpeg",
    "PHANTOM TROUSER": "/categories/trousers.jpeg",
    KIMONO: "/categories/kimono.jpeg",
  };

  return (
    imageMap[categoryName] ||
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop&crop=center"
  );
}

export function CategoriesSection() {
  return (
    <section className="py-4 lg:py-8">
      <SectionContainer maxWidth="1440" padding="sm">
        <SectionHeader
          title="Categories"
          buttonText="View All"
          buttonLink="/products"
          titleSize="3xl"
          mobileTitleSize="lg"
          className="mb-8"
        />

        {/* Scrollable categories container */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {displayCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer group flex-shrink-0"
              >
                <Link
                  href={`/products?category=${encodeURIComponent(
                    category.name
                  )}`}
                >
                  <Card className="!py-0 overflow-hidden relative transition-all duration-300 border-2 border-transparent bg-white group w-48 md:w-56">
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
                        <Image
                          width={300}
                          height={128}
                          src={category.image}
                          alt={category.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="font-semibold text-[var(--secondary)] text-sm">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Scroll indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
