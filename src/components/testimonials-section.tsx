"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { SectionContainer } from "./ui/section-container";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Custom styles for equal height cards
const swiperStyles = `
  .testimonials-swiper .swiper-wrapper {
    align-items: stretch !important;
  }
  .testimonials-swiper .swiper-slide {
    height: auto !important;
    display: flex !important;
  }
`;

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, NY",
    rating: 5,
    comment:
      "Amazing quality and authentic flavors! The plantains and yams remind me of home. Fast delivery and everything arrived fresh.",
    avatar: "/smiling-woman-profile.png",
  },
  {
    id: 2,
    name: "Marcus Williams",
    location: "Miami, FL",
    rating: 5,
    comment:
      "Best Caribbean food store online! The jerk seasoning and scotch bonnet peppers are exactly what I needed for my recipes.",
    avatar: "/smiling-man-profile.png",
  },
  {
    id: 3,
    name: "Amara Okafor",
    location: "Atlanta, GA",
    rating: 5,
    comment:
      "Finally found a reliable source for African ingredients. The palm oil and cassava flour are top quality. Highly recommend!",
    avatar: "/placeholder-sb1z2.png",
  },
  {
    id: 4,
    name: "David Thompson",
    location: "Chicago, IL",
    rating: 5,
    comment:
      "Excellent customer service and the freshest ingredients. The delivery was prompt and everything was packaged perfectly.",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 5,
    name: "Lisa Chen",
    location: "Los Angeles, CA",
    rating: 5,
    comment:
      "Love the variety of African spices available here. The quality is outstanding and prices are very reasonable.",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 6,
    name: "James Rodriguez",
    location: "Houston, TX",
    rating: 5,
    comment:
      "Been shopping here for months now. Consistently great products and fast shipping. Highly recommend to anyone!",
    avatar: "/placeholder-user.jpg",
  },
];

export function TestimonialsSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className="py-4 lg:py-8" style={{ backgroundColor: "#EDF2EE" }}>
      <style dangerouslySetInnerHTML={{ __html: swiperStyles }} />
      <SectionContainer maxWidth="1440" padding="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Client Testimonials
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear what our customers say about their experience with us
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex justify-end gap-2 mb-6">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
          </div>

          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveSlide(swiper.activeIndex);
            }}
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            autoHeight={false}
            //autoplay={{
            // delay: 4000,
            //disableOnInteraction: false,
            //}}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="testimonials-swiper !h-auto"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id} className="h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card className="p-6 h-full border-0 bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col">
                    <div className="flex flex-col h-full space-y-6">
                      {/* Rating and Quote */}
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating
                                  ? "fill-[#FF8A00] text-[#FF8A00]"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <Quote className="h-6 w-6 text-[var(--primary)] opacity-50" />
                      </div>

                      {/* Testimonial Text */}
                      <div className="flex-1 space-y-3">
                        <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                          &quot;{testimonial.comment}&quot;
                        </p>
                      </div>

                      {/* Customer Info */}
                      <div className="flex items-center space-x-3 pt-4 border-t border-gray-200 mt-auto">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                          />
                          <AvatarFallback className="text-sm">
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <p className="font-semibold text-gray-900 text-sm lg:text-base">
                            {testimonial.name}
                          </p>
                          <p className="text-xs lg:text-sm text-gray-500">
                            Customer
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => swiperRef.current?.slideTo(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeSlide ? "bg-[var(--primary)]" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
