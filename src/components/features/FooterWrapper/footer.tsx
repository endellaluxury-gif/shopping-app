"use client";

import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { SectionContainer } from "@/components/ui/section-container";
import Image from "next/image";
import Link from "next/link";

const linkMap: Record<string, string> = {
  FAQ: "/faq",
  "Delivery & Returns": "/delivery-returns",
  "Contact Us": "/contact-us",
  "Beauty Shop": "/shop",
  "About Us": "/about-us",
  "Beauty Blog": "/blog",
  "Beauty Tips": "/beauty-tips",
  "Skincare Guide": "/skincare-guide",
  "Privacy Policy": "/privacy-policy",
  "Shipping Policy": "/shipping-policy",
  "Terms & Condition": "/terms",
  "Refund Policy": "/refund-policy",
};
const footerLinks = {
  "Help & Support": ["FAQ", "Delivery & Returns", "Contact Us"],
  "Beauty & Wellness": [
    "Beauty Shop",
    "About Us",
    "Beauty Blog",
    "Beauty Tips",
    "Skincare Guide",
  ],
  Legal: [
    "Privacy Policy",
    "Shipping Policy",
    "Terms & Condition",
    "Refund Policy",
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        backgroundImage: "url('/footer.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <SectionContainer maxWidth="1440" padding="lg">
        <div className="relative z-10 py-16">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Brand section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-1 lg:col-span-2 space-y-6"
            >
              <div className="flex items-center space-x-3">
                <Image
                  src="/endella.jpg"
                  alt="AfroCarib Logo"
                  width={40}
                  height={40}
                  className="w-auto h-auto"
                />
              </div>

              <p className="text-white/80 max-w-md text-sm">
                Endella Beauty is the UK's premier destination for luxury beauty
                and skincare products. We are specialists in premium cosmetics,
                skincare essentials, and beauty products of the highest quality.
              </p>

              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-[var(--primary)]" />
                  <span className="text-sm text-white">
                    344, Sapele Road, Benin City. Edo State, Nigeria
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-[var(--primary)]" />
                  <span className="text-sm text-white">+234 706 595 2662</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-[var(--primary)]" />
                  <span className="text-sm text-white">
                    endella.luxury@gmail.com
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Links sections */}
            <div className="md:col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
              {Object.entries(footerLinks).map(([title, links], index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="space-y-4"
                >
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg text-white">
                      {title}
                    </h4>
                    <div className="w-8 h-0.5 bg-[var(--primary)]"></div>
                  </div>
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link}>
                        <Link
                          href={linkMap[link] || "#"}
                          className="text-white/70 hover:text-[var(--primary)] transition-colors text-sm"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border-t border-white/20 mt-12 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-white/70 text-sm">
                © {new Date().getFullYear()} Endella Luxury. All rights
                reserved.
              </p>

              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="text-white/70 hover:text-[var(--primary)] transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </SectionContainer>
    </footer>
  );
}
