export interface Category {
  id: number;
  name: string;
  icon?: string;
  categories?: Category[];
  subCategories?: Category[];
}

export const categories: Category[] = [
  {
    id: 1,
    name: "Endella Nature Beauty",
    icon: "💄",
    subCategories: [
      {
        id: 11,
        name: "EDLNature breast firm OIL",
      },
      {
        id: 12,
        name: "EDL breast boost support powder",
      },
      {
        id: 13,
        name: "Edl joint/nerves reliever",
      },
    ],
  },
  {
    id: 2,
    name: "EDL SHIRTS / VALID SET",
    icon: "🧴",
    subCategories: [
      {
        id: 21,
        name: "EDL Premium Cotton T-Shirt",
      },
      {
        id: 22,
        name: "EDL Luxury Polo Shirt",
      },
      {
        id: 23,
        name: "EDL Classic V-Neck Tee",
      },
      {
        id: 24,
        name: "EDL Organic Cotton Shirt",
      },
    ],
  },
  {
    id: 3,
    name: "SHORTS",
    icon: "💇‍♀️",
    subCategories: [
      {
        id: 31,
        name: "EDL Athletic Shorts",
      },
      {
        id: 32,
        name: "EDL Casual Denim Shorts",
      },
      {
        id: 33,
        name: "EDL Comfort Fit Shorts",
      },
      {
        id: 34,
        name: "EDL Summer Shorts",
      },
    ],
  },
  {
    id: 4,
    name: "EDL SPECIAL",
    icon: "🌸",
    subCategories: [
      {
        id: 41,
        name: "EDL Signature Perfume",
      },
      {
        id: 42,
        name: "EDL Luxury Body Lotion",
      },
      {
        id: 43,
        name: "EDL Premium Body Oil",
      },
      {
        id: 44,
        name: "EDL Exotic Fragrance Set",
      },
    ],
  },
  {
    id: 5,
    name: "EDL ROYALTY",
    icon: "💅",
    subCategories: [
      {
        id: 51,
        name: "EDL Royal Nail Polish Set",
      },
      {
        id: 52,
        name: "EDL Premium Gel Polish",
      },
      {
        id: 53,
        name: "EDL Luxury Nail Art Kit",
      },
      {
        id: 54,
        name: "EDL Professional Nail Tools",
      },
    ],
  },
  {
    id: 6,
    name: "JACKET / HOODIE",
    icon: "🖌️",
    subCategories: [
      {
        id: 61,
        name: "EDL Premium Jacket",
      },
      {
        id: 62,
        name: "EDL Comfort Hoodie",
      },
      {
        id: 63,
        name: "EDL Fashion Blazer",
      },
      {
        id: 64,
        name: "EDL Casual Cardigan",
      },
    ],
  },
  {
    id: 7,
    name: "PHANTOM TROUSER",
    icon: "👨",
    subCategories: [
      {
        id: 71,
        name: "EDL Phantom Trousers",
      },
      {
        id: 72,
        name: "EDL Classic Pants",
      },
      {
        id: 73,
        name: "EDL Formal Trousers",
      },
      {
        id: 74,
        name: "EDL Casual Pants",
      },
    ],
  },
  {
    id: 8,
    name: "KIMONO",
    icon: "🛁",
    subCategories: [
      {
        id: 81,
        name: "EDL Traditional Kimono",
      },
      {
        id: 82,
        name: "EDL Modern Kimono",
      },
      {
        id: 83,
        name: "EDL Silk Kimono",
      },
      {
        id: 84,
        name: "EDL Casual Kimono",
      },
    ],
  },
];

// Helper function to build breadcrumb path
export const buildBreadcrumb = (
  categories: Category[],
  targetId: number
): string[] => {
  for (const category of categories) {
    if (category.id === targetId) {
      return [category.name];
    }
    if (category.subCategories) {
      const result = buildBreadcrumb(category.subCategories, targetId);
      if (result.length > 0) {
        return [category.name, ...result];
      }
    }
  }
  return [];
};

// Helper function to find category by ID
export const findCategoryById = (
  categories: Category[],
  id: number
): Category | null => {
  for (const category of categories) {
    if (category.id === id) {
      return category;
    }
    if (category.subCategories) {
      const result = findCategoryById(category.subCategories, id);
      if (result) {
        return result;
      }
    }
  }
  return null;
};

// Helper function to check if category has subcategories
export const hasSubCategories = (category: Category): boolean => {
  return !!(category.subCategories && category.subCategories.length > 0);
};
