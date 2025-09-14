"use client";

import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { CategoriesSection } from "@/components/categories-section";
import { ProductGrid } from "@/components/product-grid";
import { PromotionalBanners } from "@/components/promotional-banners";
import { StatsSection } from "@/components/stats-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { NewsletterSection } from "@/components/newsletter-section";
import {
  bestSellerProducts,
  newArrivals,
  featuredProducts,
  backInStock,
  // householdBeautyProducts,
} from "@/lib/products-data";

export default function HomePage() {
  // Example of dynamic content that can be managed from admin
  const dynamicHeroContent = {
    // Uncomment and modify these to override default content
    // mainHeadline: "Custom Headline from Admin Panel",
    // description: "Custom description that can be changed from admin",
    // shopNowText: "Buy Now →",
    // summerSaleDiscount: "50% OFF",
    // bestDealDescription: "Monthly Special Offers"
  };

  return (
    <div className="bg-background">
      <HeroSection content={dynamicHeroContent} />
      <FeaturesSection />
      <CategoriesSection />
      <ProductGrid
        title="Best Seller Products"
        products={bestSellerProducts}
        viewAllLink="/products/best-sellers"
      />
      <ProductGrid
        title="New Arrivals"
        products={newArrivals}
        viewAllLink="/products/new-arrivals"
      />
      <PromotionalBanners />
      <ProductGrid
        title="Back in Stock"
        products={backInStock}
        viewAllLink="/products/back-in-stock"
      />
      <ProductGrid
        title="Featured Products"
        products={featuredProducts}
        viewAllLink="/products/featured"
      />
      <StatsSection />

      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
}
