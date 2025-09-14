"use client";

import { useRef, useState } from "react";
import { SectionContainer } from "@/components/ui/section-container";
import { motion, useInView } from "framer-motion";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { faqData, FAQItemComponentProps } from "./faq.helper";

const FAQItemComponent = ({
  item,
  isExpanded,
  onToggle,
  index,
}: FAQItemComponentProps) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        "w-full max-w-[800px] mx-auto rounded-2xl transition-all duration-300 overflow-hidden",
        isExpanded ? "bg-green-600" : "bg-gray-100"
      )}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 text-left focus:outline-none"
        aria-expanded={isExpanded}
        aria-controls={`faq-content-${item.id}`}
      >
        <div className="flex items-center justify-between">
          <h3
            className={cn(
              "text-base font-semibold leading-6 transition-colors duration-300",
              isExpanded ? "text-white" : "text-gray-900"
            )}
          >
            {item.question}
          </h3>
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "flex-shrink-0 ml-4 transition-colors duration-300",
              isExpanded ? "text-orange-400" : "text-green-600"
            )}
          >
            {isExpanded ? (
              <X className="h-5 w-5" strokeWidth={1.6} />
            ) : (
              <Plus className="h-5 w-5" strokeWidth={1.6} />
            )}
          </motion.div>
        </div>
      </button>

      <motion.div
        id={`faq-content-${item.id}`}
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6">
          <p className="text-white text-sm leading-6 font-normal tracking-tight">
            {item.answer}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Faq = () => {
  const [expandedId, setExpandedId] = useState<string>("delivery-time");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-250px" });

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? "" : id);
  };
  return (
    <SectionContainer className="mt-6 lg:mt-10">
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="w-full text-[38px] md:text-[42px] lg:text-[48px] font-semibold">
          Frequently asked questions
        </h1>
        <p className="text-base md:text-lg text-gray-500 w-full max-w-[760px] mx-auto mt-2">
          Got questions? We&apos;ve answered some of the most common ones to
          help make your shopping experience smooth and stress-free.
        </p>
      </motion.div>
      <div className="space-y-3 mt-10">
        {faqData.map((item, index) => (
          <FAQItemComponent
            key={item.id}
            item={item}
            isExpanded={expandedId === item.id}
            onToggle={() => handleToggle(item.id)}
            index={index}
          />
        ))}
      </div>
    </SectionContainer>
  );
};

export default Faq;
