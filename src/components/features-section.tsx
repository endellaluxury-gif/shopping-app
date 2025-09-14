"use client"

import { motion } from "framer-motion"
import { Truck, Headphones, Shield, RotateCcw } from "lucide-react"
import { SectionContainer } from "@/components/ui/section-container"

interface Feature {
    icon: React.ReactNode
    title: string
    subtitle: string
}

// Mobile features (matching the image)
const mobileFeatures: Feature[] = [
    {
        icon: <Truck className="h-6 w-6" />,
        title: "Free Shipping",
        subtitle: "On all orders"
    },
    {
        icon: <Headphones className="h-6 w-6" />,
        title: "24/7 Support",
        subtitle: "Instant access"
    },
    {
        icon: <Shield className="h-6 w-6" />,
        title: "Secure Payment",
        subtitle: "100% protected"
    },
    {
        icon: <RotateCcw className="h-6 w-6" />,
        title: "Money Back",
        subtitle: "30 day guarantee"
    }
]

// Desktop features (current content)
const desktopFeatures: Feature[] = [
    {
        icon: <Truck className="h-6 w-6" />,
        title: "Free Shipping",
        subtitle: "On all your order"
    },
    {
        icon: <Headphones className="h-6 w-6" />,
        title: "24/7 Support",
        subtitle: "Instant access"
    },
    {
        icon: <Shield className="h-6 w-6" />,
        title: "Secure Payment",
        subtitle: "100% protected"
    },
    {
        icon: <RotateCcw className="h-6 w-6" />,
        title: "Money Back",
        subtitle: "30 day  not mguarantee"
    }
];

export function FeaturesSection() {
    return (
        <section className="">
            <SectionContainer maxWidth="1440" padding="sm">
                {/* Mobile: Individual card backgrounds */}
                <div className="lg:hidden grid grid-cols-2 gap-2">
                    {mobileFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="bg-[#F9FAFB] rounded-2xl px-2 py-4">
                                <div className="flex items-start gap-1">
                                    <div className="p-2 rounded-full bg-white shadow-sm flex-shrink-0 relative group animate-pulse" style={{ animationDelay: `${index * 0.5}s` }}>
                                        <div className="text-[var(--primary)] relative z-10">
                                            {feature.icon}
                                        </div>
                                        {/* Blinking glow effect */}
                                        <div className="absolute inset-0 rounded-full bg-[var(--primary)] opacity-0 animate-ping" style={{ animationDelay: `${index * 0.3}s` }}></div>
                                        <div className="absolute inset-0 rounded-full bg-[var(--primary)] opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-300"></div>
                                        <div className="absolute inset-0 rounded-full bg-[var(--primary)] opacity-10 blur-md group-hover:opacity-25 transition-opacity duration-300"></div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xs lg:text-sm font-semibold text-[var(--secondary)] mb-1">
                                            {feature.title}
                                        </h3>
                                        <p className="text-xs lg:text-sm text-[#666666] leading-relaxed">
                                            {feature.subtitle}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Desktop: White background container with shadow, transparent cards */}
                <div className="hidden lg:block bg-white rounded-2xl drop-shadow-xl p-8">
                    <div className="flex justify-between items-center gap-6">
                        {desktopFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                {/* Desktop: Transparent cards (no background) */}
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-full bg-[#F9FAFB] flex-shrink-0 relative group animate-pulse" style={{ animationDelay: `${index * 0.5}s` }}>
                                        <div className="text-[var(--primary)] relative z-10">
                                            {feature.icon}
                                        </div>
                                        {/* Blinking glow effect */}
                                        <div className="absolute inset-0 rounded-full bg-[var(--primary)] opacity-0 animate-ping" style={{ animationDelay: `${index * 0.3}s` }}></div>
                                        <div className="absolute inset-0 rounded-full bg-[var(--primary)] opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-300"></div>
                                        <div className="absolute inset-0 rounded-full bg-[var(--primary)] opacity-10 blur-md group-hover:opacity-25 transition-opacity duration-300"></div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-base font-semibold text-[var(--secondary)] mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-[#666666] leading-relaxed">
                                            {feature.subtitle}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </SectionContainer>
        </section>
    )
}
