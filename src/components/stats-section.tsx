"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { SectionContainer } from "@/components/ui/section-container"

const stats = [
  { number: 37, label: "Years of Hard Work", suffix: "+" },
  { number: 500, label: "Happy Customer", suffix: "k+" },
  { number: 4.5, label: "Google Rating", suffix: "" },
  { number: 750, label: "Monthly Orders", suffix: "k+" },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const timer = setInterval(() => {
        setCount((prev) => {
          const increment = value / 50
          if (prev < value) {
            return Math.min(prev + increment, value)
          }
          clearInterval(timer)
          return value
        })
      }, 30)
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-light text-[var(--primary)]">
      {Math.floor(count)}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section 
      className="py-16 relative"
      style={{
        backgroundImage: 'url(/bg.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <SectionContainer maxWidth="1440" padding="sm">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 xl:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-white/7 rounded-2xl p-6 md:p-8 lg:p-12">
                <AnimatedNumber value={stat.number} suffix={stat.suffix} />
                <p className="text-white font-regular font-montserrat mt-2 text-sm">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}
