"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useState } from "react";
import { SectionContainer } from "./ui/section-container";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    // Add your newsletter subscription logic here
  };

  return (
    <SectionContainer maxWidth="1440" padding="lg">
      <section
        className="py-16 lg:py-24 relative overflow-hidden rounded-2xl"
        style={{
          backgroundImage: "url('/placeholder.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Content */}
            <div className="space-y-6 mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-white">
                Beauty Made Simple
              </h2>
              <h3 className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-white">
                Straight to Your Door
              </h3>
              <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto">
                Get premium beauty products, exclusive deals, and beauty tips.
                Delivered with care
              </p>
            </div>

            {/* Newsletter Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
            >
              {/* Desktop: Button inside input */}
              <div className="hidden md:block">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-white/90 border-white/20 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-white pr-32 md:rounded-3xl"
                    required
                  />
                  <Button
                    type="submit"
                    className="absolute right-1 top-1 h-10 px-6 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-semibold text-sm rounded-e-2xl"
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    Subscribe
                  </Button>
                </div>
              </div>

              {/* Mobile: Input and button stacked */}
              <div className="md:hidden space-y-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-white/90 border-white/20 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-white w-full rounded-3xl"
                  required
                />
                <Button
                  type="submit"
                  className="h-12 w-full bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-semibold rounded-3xl"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Subscribe
                </Button>
              </div>
            </motion.form>
          </motion.div>
        </div>{" "}
      </section>
    </SectionContainer>
  );
}
