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

  // SHORTS products

  // EDL SPECIAL products

  // EDL ROYALTY products

  // JACKET / HOODIE products
  {
    id: 20,
    name: "EDL Premium Jacket",
    badge: "New",
    price: 54.99,
    rating: 4.8,
    reviews: 56,
    video: "/videos/vibe_warmth_hoodie.mp4",
    image: "/products/hoddie.png",
    category: "JACKET / HOODIE",
  },

  // PHANTOM TROUSER products
  {
    id: 24,
    name: "EDL Joggers",
    badge: "New",
    price: 48.99,
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
    price: 44.99,
    rating: 4.9,
    reviews: 67,
    video: "/videos/joggers2.mp4",
    image: "/products/joggers1.jpg",
    category: "PHANTOM TROUSER",
  },

  // KIMONO products
  {
    id: 28,
    name: "EDL Vogue Culture",
    badge: "Best Seller",
    price: 89.99,
    rating: 4.8,
    reviews: 56,
    video: "/videos/vibe_warmth_hoodie.mp4",
    image: "/products/vogue_culture.jpg",
    category: "KIMONO",
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
