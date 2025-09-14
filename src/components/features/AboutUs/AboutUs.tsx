"use client";

import { SectionContainer } from "@/components/ui/section-container";
import { Headset, ShieldCheck, TruckIcon } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import Subscription from "../Subscription/Subscription";

const AboutUs = () => {
  return (
    <div>
      <section className="w-full hidden h-full lg:min-h-[360px] bg-[url('/aboutus/hero.png')] bg-cover bg-center lg:flex flex-col items-center justify-center gap-5">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-white font-semibold text-[28px] lg:text-[36px]"
        >
          Beauty Redefined. Confidence Delivered.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white font-normal text-[14px]"
        >
          Premium beauty and skincare products, carefully curated for your
          unique beauty journey{" "}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-white font-semibold text-[18px]"
        >
          About Us
        </motion.p>
      </section>
      <Image
        alt=""
        src="/aboutus/hero_mobile.png"
        width={400}
        height={300}
        className="lg:hidden w-full object-cover"
      />
      {/*Our Story */}
      <SectionContainer className="flex flex-col lg:flex-row gap-6 w-full lg:gap-10 justify-between items-center mt-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-4 lg:max-w-[55%]"
        >
          <p className="text-[15px] font-semibold text-[#0E7346]">Our Story</p>
          <h2 className="text-black font-semibold text-[26px] lg:text-[32px]">
            Our company
          </h2>
          <p className="text-[16px] lg:text-[20px] font-normal">
            Endella is the beauty brand that celebrates the essence of natural
            beauty and self-expression. Inspired by the diversity of beauty and
            a passion for quality ingredients, we create premium skincare and
            makeup products that enhance your natural radiance. Endella believes
            that beauty comes in all forms and our mission is to help you
            discover and celebrate your unique beauty.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-full hidden lg:block"
        >
          <Image
            src="/aboutus/our_story1.png"
            alt=""
            width={543}
            height={400}
            className="rounded-xl w-full hidden lg:block object-contain"
          />
        </motion.div>

        <Image
          src="/aboutus/our_story1_mobile.png"
          alt=""
          width={543}
          height={400}
          className="rounded-xl lg:hidden object-cover w-full"
        />
      </SectionContainer>
      <SectionContainer>
        <div className="flex flex-col lg:flex-row gap-6 w-full lg:gap-10 justify-between items-center mt-10">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-full"
          >
            <Image
              src="/aboutus/our_story2.png"
              alt=""
              width={543}
              height={400}
              className="rounded-xl w-full hidden lg:block object-cover"
            />
          </motion.div>
          <Image
            src="/aboutus/our_story2_mobile.png"
            alt=""
            width={543}
            height={400}
            className="rounded-xl lg:hidden object-cover w-full"
          />
          <motion.div className="flex flex-col gap-4 lg:max-w-[55%]">
            <h2 className="text-black font-semibold text-[26px] lg:text-[32px]">
              Quality at its finest
            </h2>
            <p className="text-[16px] lg:text-[20px] font-normal">
              At Endella, we are committed to sourcing the finest ingredients
              and creating products that meet the highest standards of quality
              and safety. Every product is carefully formulated and tested to
              ensure it delivers exceptional results.
            </p>
            <p className="text-[16px] lg:text-[20px] font-normal mt-2">
              We believe that beauty should be accessible to everyone, which is
              why we create products that work for all skin types and tones. Our
              commitment to inclusivity and quality ensures that every customer
              can find products that make them feel confident and beautiful.
            </p>
          </motion.div>
        </div>
        <hr className="mt-16 border-t border-gray-600" />
      </SectionContainer>
      <SectionContainer className="mt-12 w-full text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-bold text-[28px] lg:text-[36px]"
        >
          Why Choose Us
        </motion.h2>
        <div className="flex flex-col lg:flex-row w-full items-center justify-between gap-6 lg:gap-10 mt-14">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Image
              src="/aboutus/why.png"
              alt=""
              width={543}
              height={400}
              className="rounded-xl object-contain hidden lg:block"
            />
          </motion.div>
          <Image
            src="/aboutus/why_mobile.png"
            alt=""
            width={543}
            height={400}
            className="rounded-xl object-cover lg:hidden w-full"
          />
          <section className="w-full lg:max-w-3xl mx-auto py-12 text-start">
            <ul className="space-y-6">
              {[
                {
                  title: "Fast Delivery",
                  desc: "Get your beauty products quickly with reliable, nationwide delivery",
                  icon: <TruckIcon />,
                },
                {
                  title: "Expert Support",
                  desc: "Our beauty experts are here to help with any product questions or concerns.",
                  icon: <Headset />,
                },
                {
                  title: "Quality Guaranteed",
                  desc: "We source only the finest ingredients and test every product for safety and effectiveness.",
                  icon: <ShieldCheck />,
                },
                {
                  title: "Safe Payment",
                  desc: "Secure and encrypted checkout with trusted payment methods.",
                  icon: <ShieldCheck />,
                },
                {
                  title: "Beauty Rewards",
                  desc: "Exclusive savings and offers for our beauty community members.",
                  icon: <ShieldCheck />,
                },
              ].map((feature, i) => (
                <motion.li
                  key={feature.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-[#d4eddb] flex items-center justify-center rounded-full p-2">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-[#0E7346] text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[20px] text-black">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-base mt-2">
                      {feature.desc}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </section>
        </div>
      </SectionContainer>
      <Subscription />
    </div>
  );
};

export default AboutUs;
