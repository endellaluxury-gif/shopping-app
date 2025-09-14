export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: "delivery-time",
    question: "How long will delivery take?",
    answer:
      "Endella Beauty offers premium beauty products including skincare, cosmetics, haircare, and wellness essentials. We carefully curate our collection to bring you the finest beauty products from trusted brands worldwide, ensuring quality and authenticity in every purchase.",
  },
  {
    id: "registration",
    question: "How can I register on Endella Beauty website?",
    answer:
      "You can register by visiting our website and clicking on the 'Sign Up' button. Fill in your personal details, create a password, and verify your email address to complete the registration process and start your beauty journey with us.",
  },
  {
    id: "place-order",
    question: "How can I place an order?",
    answer:
      "To place an order, browse our beauty products, add items to your cart, proceed to checkout, fill in your delivery details, and complete the payment process. We'll ensure your beauty essentials are carefully packaged and delivered to you.",
  },
  {
    id: "product-quality",
    question: "Are all beauty products authentic and high-quality?",
    answer:
      "Yes, Endella Beauty is committed to providing only authentic, high-quality beauty products. We source directly from authorized distributors and brands, ensuring every product meets our strict quality standards and authenticity guarantees.",
  },
  {
    id: "getting-items",
    question: "How do I get my items after placing an order?",
    answer:
      "After placing your order, you can choose between home delivery or store pickup. We'll provide tracking information and estimated delivery times for your convenience. Your beauty products will be carefully packaged to maintain their quality.",
  },
  {
    id: "delivery-costs",
    question: "How much does it cost for pick-up and delivery?",
    answer:
      "Delivery costs vary based on your location and order size. Pickup is free from our store. Check our delivery zones and pricing during checkout for exact costs. We offer free delivery on orders over £50.",
  },
  {
    id: "payment",
    question: "How can I make payment for my order?",
    answer:
      "We accept various payment methods including credit/debit cards, bank transfers, and digital wallets. All payments are processed securely through our encrypted payment system to protect your personal and financial information.",
  },
  {
    id: "beauty-advice",
    question: "Do you provide beauty advice and product recommendations?",
    answer:
      "Yes, our beauty experts are available to help you find the perfect products for your skin type and beauty needs. Contact our customer service team for personalized recommendations and beauty tips.",
  },
  {
    id: "contact",
    question: "How can I contact Endella Beauty?",
    answer:
      "You can contact us through our website contact form, email us directly, call our customer service line, or visit our physical store during business hours. Our beauty experts are here to help with any questions you may have.",
  },
  {
    id: "uk-orders",
    question: "Can I order from anywhere in the UK?",
    answer:
      "Yes, we deliver to most areas across the UK. Some remote locations may have extended delivery times or additional charges. We ensure your beauty products are delivered safely and promptly wherever you are.",
  },
];

export interface FAQItemComponentProps {
  item: FAQItem;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}
