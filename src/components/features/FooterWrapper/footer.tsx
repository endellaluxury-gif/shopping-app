"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { SectionContainer } from "@/components/ui/section-container";
import Image from "next/image";
import Link from "next/link";

const linkMap: Record<string, string> = {
  FAQ: "/faq",
  "Delivery & Returns": "/",
  "Contact Us": "/contact-us",
  Products: "/products",
  "About Us": "/about-us",
  "Terms & Condition": "/",
  "Refund Policy": "/",
  Cart: "/cart",
};
const footerLinks = {
  Products: ["FAQ", "Products", "Cart"],
  "Our Company": ["About Us", "Contact Us", "FAQ"],
  Legal: [
    "Privacy Policy",
    "Shipping Policy",
    "Terms & Condition",
    "Refund Policy",
  ],
};

const socialLinks = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/share/17yUUttWhg/",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/endellacoutures?utm_source=qr&igsh=d2hpbXB4azY5Z3Nw",
    label: "Instagram",
  },
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
                Endella Couture andNatural Beauty is Nigeria&apos;s premier
                destination for exotic fashion and beauty products. We
                specialize in premium clothing, hoodies, jackets, vogue culture
                pieces, and high-quality makeup and beauty essentials for the
                modern lifestyle.
              </p>

              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-[var(--primary)]" />
                  <span className="text-sm text-white">
                    Golden Garden estate olayundun Ayanleke close off ponle
                    street egbeda Lagos, Nigeria
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-[var(--primary)]" />
                  <span className="text-sm text-white">+234 706 595 2662</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-[var(--primary)]" />
                  <span className="text-sm text-white">
                    endysworld@yahoo.com
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
                © {new Date().getFullYear()} Endella Natural Beauty. All rights
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
