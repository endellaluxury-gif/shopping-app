export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  video?: string; // Optional video URL
  images?: string[]; // Optional array of additional images
  category: string;
  badge?: string;
}

// All products in a single array with proper category mapping
export const products: Product[] = [
  // EDL SHIRTS / VALID SET products
  {
    id: 1,
    name: "HD Shirts Set",
    badge: "New",
    price: 120000,
    rating: 4.6,
    reviews: 16,
    image: "/products/edl_couture_hd.jpg",
    category: "EDL SPECIAL",
  },
  {
    id: 2,
    name: "HD Shirts Set",
    badge: "New",
    price: 120000,
    rating: 4.8,
    reviews: 8,
    image: "/products/edl_couture_cream.jpg",
    category: "EDL SPECIAL",
  },
  {
    id: 3,
    name: "EDL Vintage Shirt",
    badge: "New",
    price: 35000,
    rating: 4.6,
    reviews: 29,
    image: "/products/edl_vintage_shirt.jpg",
    category: "EDL SHIRTS / VALID SET",
  },
  {
    id: 4,
    name: "EDL Shirt & Hat Set",
    badge: "New",
    price: 100000,
    rating: 4.6,
    reviews: 45,
    image: "/products/edl_shirt_and_hat.jpg",
    category: "EDL SHIRTS / VALID SET",
  },
  {
    id: 5,
    name: "EDL Phantom Trousers Brown",
    badge: "New",
    price: 100000,
    rating: 4.6,
    reviews: 17,
    image: "/products/endella_couture.jpg",
    category: "PHANTOM TROUSER",
  },
  {
    id: 6,
    name: "EDL Phantom Trousers White",
    badge: "New",
    price: 100000,
    rating: 4.6,
    reviews: 22,
    image: "/products/endella_couture_white.jpg",
    category: "PHANTOM TROUSER",
  },
  {
    id: 7,
    name: "EDL Executive T suit",
    badge: "New",
    price: 160000,
    rating: 4.8,
    reviews: 18,
    image: "/products/edl_royal_blue.jpg",
    category: "EDL ROYALTY",
  },
  {
    id: 8,
    name: "EDL Executive T suit",
    badge: "New",
    price: 160000,
    rating: 4.9,
    reviews: 23,
    image: "/products/edl_royal_brown.jpg",
    category: "EDL ROYALTY",
  },

  // SHORTS products
  {
    id: 9,
    name: "EDL Buggie Set Black",
    badge: "Best Seller",
    price: 80000,
    rating: 4.8,
    reviews: 78,
    image: "/products/buggie_set_black.jpg",
    category: "SHORTS",
  },

  {
    id: 10,
    name: "EDL Royalty",
    badge: "Premium",
    price: 160000,
    rating: 4.9,
    reviews: 12,
    image: "/products/edl_royal3.jpg",
    category: "EDL ROYALTY",
  },
  {
    id: 11,
    name: "EDL Royalty",
    badge: "Premium",
    price: 160000,
    rating: 4.9,
    reviews: 12,
    image: "/products/edl_royal2.jpg",
    category: "EDL ROYALTY",
  },
  {
    id: 12,
    name: "EDL Royalty",
    badge: "Premium",
    price: 185000,
    rating: 4.9,
    reviews: 12,
    image: "/products/edl_royal1.jpg",
    category: "EDL ROYALTY",
  },
  {
    id: 13,
    name: "EDL Royal",
    price: 150000,
    rating: 4.9,
    reviews: 5,
    image: "/products/edl_royal_white.png",
    video: "/products/edl_royal2.mp4",
    category: "EDL ROYALTY",
  },
  {
    id: 14,
    name: "EDL Royalty Trousers",
    badge: "Premium",
    price: 80000,
    rating: 4.8,
    reviews: 18,
    image: "/products/joggers1.jpg",
    images: ["/products/joggers1.jpg", "/products/joggers_white1.jpg"],
    category: "EDL SPECIAL",
  },

  // JACKET / HOODIE products
  {
    id: 15,
    name: "EDL Premium Jacket",
    badge: "New",
    price: 80000,
    rating: 4.8,
    reviews: 56,
    video: "/videos/vibe_warmth_hoodie.mp4",
    image: "/products/smart_hoodie.jpg",
    category: "JACKET / HOODIE",
  },
  {
    id: 16,
    name: "EDL Shirt Set",
    badge: "New",
    price: 100000,
    rating: 4.7,
    reviews: 89,
    image: "/products/edl_shirt_set.jpg",
    category: "EDL SHIRTS / VALID SET",
  },
  {
    id: 17,
    name: "EDL HQ Shirt Black",
    badge: "Best Seller",
    price: 150000,
    rating: 4.7,
    reviews: 13,
    image: "/products/edl_hq_shirt_black.jpg",
    category: "EDL SHIRTS / VALID SET",
  },
  {
    id: 18,
    name: "EDL HQ Shirt White",
    badge: "New",
    price: 150000,
    rating: 5,
    reviews: 10,
    image: "/products/edl_hq_shirt_white.jpg",
    category: "EDL SHIRTS / VALID SET",
  },
  {
    id: 19,
    name: "EDL HQ Shirt White & Gold",
    badge: "New",
    price: 150000,
    rating: 5,
    reviews: 10,
    image: "/products/edl_hq_shirt_white2.jpg",
    category: "EDL SHIRTS / VALID SET",
  },

  // PHANTOM TROUSER products
  {
    id: 20,
    name: "EDL Joggers",
    badge: "New",
    price: 80000,
    rating: 4.6,
    reviews: 89,
    video: "/videos/joggers2.mp4",
    image: "/products/joggers_white1.jpg",
    category: "PHANTOM TROUSER",
  },

  // KIMONO products
  {
    id: 21,
    name: "EDL Vogue Culture",
    badge: "Best Seller",
    price: 70000,
    rating: 4.8,
    reviews: 56,
    image: "/products/vogue_culture.jpg",
    category: "KIMONO",
  },

  // Weather Friendly Collection
  {
    id: 22,
    name: "EDL Weather Friendly Smash Set",
    badge: "Best Seller",
    price: 80000,
    rating: 4.9,
    reviews: 67,
    image: "/products/weather_friendly_smash_set.jpg",
    category: "EDL SPECIAL",
  },
  {
    id: 23,
    name: "EDL Weather Friendly Smash Set Brown",
    badge: "New",
    price: 80000,
    rating: 4.7,
    reviews: 34,
    image: "/products/weather_friendly_smash_set_brown.jpg",
    category: "EDL SPECIAL",
  },
  {
    id: 24,
    name: "EDL Vintage Shirt",
    badge: "Limited",
    price: 30000,
    rating: 4.8,
    reviews: 89,
    image: "/products/edl_vintage_shirt.jpg",
    category: "EDL SHIRTS / VALID SET",
  },

  // Phantom Pants Collection
  {
    id: 25,
    name: "EDL Phantom Pants",
    badge: "New",
    price: 35000,
    rating: 4.6,
    reviews: 56,
    image: "/products/phantom_pants.jpg",
    category: "PHANTOM TROUSER",
  },

  // Java Jacket Collection
  {
    id: 26,
    name: "EDL Java Jacket Set",
    badge: "Premium",
    price: 100000,
    rating: 4.9,
    reviews: 23,
    image: "/products/edl_java_scripted_jacket_set.jpg",
    category: "JACKET / HOODIE",
  },

  // Buggie Set Collection
  {
    id: 27,
    name: "EDL Buggie Set Black",
    badge: "Best Seller",
    price: 80000,
    rating: 4.8,
    reviews: 78,
    image: "/products/buggie_set_black.jpg",
    category: "EDL SPECIAL",
  },

  // EDL Special Collection
  {
    id: 28,
    name: "EDL Special Edition",
    badge: "Limited",
    price: 35000,
    rating: 4.9,
    reviews: 45,
    image: "/products/edl_special.jpg",
    category: "EDL SPECIAL",
  },
  {
    id: 29,
    name: "EDL Exclusive",
    badge: "Limited",
    price: 160000,
    rating: 4.9,
    reviews: 45,
    image: "/products/edl_exclusive.jpg",
    category: "EDL SPECIAL",
  },
  {
    id: 30,
    name: "EDL Exclusive",
    badge: "Premium",
    price: 160000,
    rating: 4.9,
    reviews: 23,
    image: "/products/edl_jacket.jpg",
    video: "/products/edl_jacket_red.mp4",
    images: ["/products/edl_jacket.jpg", "/products/edl_suits1.jpg"],
    category: "EDL SPECIAL",
  },
];

// Helper functions for filtering products
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getAllCategories = (): string[] => {
  return [...new Set(products.map((product) => product.category))];
};

export const getBestSellerProducts = (): Product[] => {
  return products.filter((product) => product.badge === "Best Seller");
};

export const getNewArrivals = (): Product[] => {
  return products.filter((product) => product.badge === "New");
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.rating >= 4.8);
};

export const getBackInStock = (): Product[] => {
  return products.filter(
    (product) => product.originalPrice && product.originalPrice > product.price
  );
};

export const getHouseholdBeautyProducts = (): Product[] => {
  return products.filter(
    (product) =>
      product.category === "Endella Nature Beauty" ||
      product.category === "EDL SPECIAL"
  );
};
export const getClothingProducts = (): Product[] => {
  return products.filter(
    (product) =>
      product.category === "JACKET / HOODIE" ||
      product.category === "PHANTOM TROUSER" ||
      product.category === "KIMONO" ||
      product.category === "EDL SHIRTS / VALID SET" ||
      product.category === "SHORTS" ||
      product.category === "EDL SPECIAL"
  );
};
