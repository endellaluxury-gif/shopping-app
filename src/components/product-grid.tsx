"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ProductCard } from "@/components/ui/product-card"
import { SectionHeader } from "@/components/ui/section-header"
import { SectionContainer } from "@/components/ui/section-container"
import { Product } from "@/lib/products-data"

interface ProductGridProps {
  title: string
  products: Product[]
  viewAllLink?: string
  maxProducts?: number
}

export function ProductGrid({ title, products, viewAllLink, maxProducts }: ProductGridProps) {
  const [displayProducts, setDisplayProducts] = useState<Product[]>([])
  const [screenSize, setScreenSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg')

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setScreenSize('xl')
      } else if (window.innerWidth >= 1024) {
        setScreenSize('lg')
      } else if (window.innerWidth >= 768) {
        setScreenSize('md')
      } else {
        setScreenSize('sm')
      }
    }

    // Set initial size
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    let productLimit = 4 // default for lg and above

    if (screenSize === 'md') {
      productLimit = 6
    } else if (screenSize === 'sm') {
      productLimit = 4
    } else if (screenSize === 'xl') {
      productLimit = 5
    }

    // Apply maxProducts constraint if provided
    if (maxProducts) {
      productLimit = Math.min(productLimit, maxProducts)
    }

    setDisplayProducts(products.slice(0, productLimit))
  }, [screenSize, products, maxProducts])

  return (
    <section className="py-4 lg:py-8">
      <SectionContainer maxWidth="1440" padding="sm">
        <SectionHeader
          title={title}
          buttonLink={viewAllLink}
          buttonText="View All"
          titleSize="3xl"
          mobileTitleSize="lg"
          className="mb-8"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-6">
          {displayProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard
                product={product}
                onAddToCart={(product) => console.log('Add to cart:', product)}
                onAddToWishlist={(product) => console.log('Add to wishlist:', product)}
                onQuickView={(product) => console.log('Quick view:', product)}
                onProductClick={(product) => console.log('Product clicked:', product)}
              />
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}
