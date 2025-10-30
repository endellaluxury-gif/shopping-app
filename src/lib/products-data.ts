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
  // Endella Nature Beauty products

  // EDL SHIRTS / VALID SET products
  {
    id: 4,
    name: "EDL Vintage Shirt",
    badge: "New",
    price: 35000,
    rating: 4.6,
    reviews: 45,
    image: "/products/edl_vintage_shirt.jpg",
    category: "EDL SHIRTS / VALID SET",
  },

  // SHORTS products
  {
    id: 2,
    name: "EDL Buggie Set Black",
    badge: "Best Seller",
    price: 80000,
    rating: 4.8,
    reviews: 78,
    image: "/products/buggie_set_black.jpg",
    category: "SHORTS",
  },

  // EDL SPECIAL products

  // EDL ROYALTY products
  {
    id: 7,
    name: "EDL Royalty",
    badge: "Premium",
    price: 160000,
    rating: 4.9,
    reviews: 12,
    image: "/products/edl_royal3.jpg",
    category: "EDL ROYALTY",
  },
  {
    id: 8,
    name: "EDL Royalty",
    badge: "Premium",
    price: 160000,
    rating: 4.9,
    reviews: 12,
    image: "/products/edl_royal2.jpg",
    category: "EDL ROYALTY",
  },
  {
    id: 9,
    name: "EDL Royalty",
    badge: "Premium",
    price: 185000,
    rating: 4.9,
    reviews: 12,
    image: "/products/edl_royal1.jpg",
    category: "EDL ROYALTY",
  },
  {
    id: 10,
    name: "EDL Royalty Jacket",
    badge: "Premium",
    price: 80000,
    rating: 4.9,
    reviews: 12,
    image: "/products/hoddie.png",
    category: "EDL ROYALTY",
  },
  {
    id: 11,
    name: "EDL Royalty Trousers",
    badge: "Premium",
    price: 80000,
    rating: 4.8,
    reviews: 18,
    image: "/products/joggers1.jpg",
    images: ["/products/joggers1.jpg", "/products/joggers_white1.jpg"],
    category: "EDL ROYALTY",
  },

  // JACKET / HOODIE products
  {
    id: 20,
    name: "EDL Premium Jacket",
    badge: "New",
    price: 80000,
    rating: 4.8,
    reviews: 56,
    video: "/videos/vibe_warmth_hoodie.mp4",
    image: "/products/hoddie.png",
    category: "JACKET / HOODIE",
  },
  {
    id: 21,
    name: "EDL Classic Hoodie",
    badge: "Best Seller",
    price: 80000,
    originalPrice: 90000,
    rating: 4.7,
    reviews: 89,
    image: "/products/hoddie.png",
    category: "JACKET / HOODIE",
  },

  // PHANTOM TROUSER products
  {
    id: 24,
    name: "EDL Joggers",
    badge: "New",
    price: 80000,
    rating: 4.6,
    reviews: 89,
    video: "/videos/joggers2.mp4",
    image: "/products/joggers_white1.jpg",
    category: "PHANTOM TROUSER",
  },
  {
    id: 25,
    name: "EDL Orange Joggers",
    badge: "New",
    price: 80000,
    rating: 4.9,
    reviews: 67,
    video: "/videos/joggers2.mp4",
    image: "/products/joggers1.jpg",
    category: "PHANTOM TROUSER",
  },
  {
    id: 26,
    name: "EDL White Joggers",
    badge: "Best Seller",
    price: 80000,
    originalPrice: 90000,
    rating: 4.8,
    reviews: 123,
    image: "/products/joggers_white1.jpg",
    category: "PHANTOM TROUSER",
  },

  // KIMONO products
  {
    id: 28,
    name: "EDL Vogue Culture",
    badge: "Best Seller",
    price: 70000,
    rating: 4.8,
    reviews: 56,
    image: "/products/vogue_culture.jpg",
    category: "KIMONO",
  },

  // NEW PRODUCTS BASED ON AVAILABLE IMAGES
  // Smart Hoodie Collection
  {
    id: 31,
    name: "EDL Smart Hoodie",
    badge: "New",
    price: 80000,
    rating: 4.8,
    reviews: 45,
    image: "/products/smart_hoodie.jpg",
    category: "JACKET / HOODIE",
  },

  // Weather Friendly Collection
  {
    id: 32,
    name: "EDL Weather Friendly Smash Set",
    badge: "Best Seller",
    price: 80000,
    rating: 4.9,
    reviews: 67,
    image: "/products/weather_friendly_smash_set.jpg",
    category: "EDL SPECIAL",
  },
  {
    id: 33,
    name: "EDL Weather Friendly Smash Set Brown",
    badge: "New",
    price: 80000,
    rating: 4.7,
    reviews: 34,
    image: "/products/weather_friendly_smash_set_brown.jpg",
    category: "EDL SPECIAL",
  },

  // Vintage Collection
  {
    id: 34,
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
    id: 35,
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
    id: 36,
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
    id: 37,
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
    id: 38,
    name: "EDL Special Edition",
    badge: "Limited",
    price: 35000,
    rating: 4.9,
    reviews: 45,
    image: "/products/edl_special.jpg",
    category: "EDL SPECIAL",
  },
  {
    id: 39,
    name: "EDL Exclusive",
    badge: "Limited",
    price: 160000,
    rating: 4.9,
    reviews: 45,
    image: "/products/edl_exclusive.jpg",
    category: "EDL SPECIAL",
  },
  {
    id: 40,
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
