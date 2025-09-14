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
    name: "Makeup",
    icon: "💄",
    subCategories: [
      {
        id: 11,
        name: "Face Makeup",
        subCategories: [
          { id: 111, name: "Foundation" },
          { id: 112, name: "Concealer" },
          { id: 113, name: "Powder" },
          { id: 114, name: "Blush" },
          { id: 115, name: "Bronzer" },
          { id: 116, name: "Highlighter" },
        ],
      },
      {
        id: 12,
        name: "Eye Makeup",
        subCategories: [
          { id: 121, name: "Eyeshadow" },
          { id: 122, name: "Eyeliner" },
          { id: 123, name: "Mascara" },
          { id: 124, name: "Eyebrow Products" },
          { id: 125, name: "False Lashes" },
        ],
      },
      {
        id: 13,
        name: "Lip Makeup",
        subCategories: [
          { id: 131, name: "Lipstick" },
          { id: 132, name: "Lip Gloss" },
          { id: 133, name: "Lip Liner" },
          { id: 134, name: "Lip Balm" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Skincare",
    icon: "🧴",
    subCategories: [
      {
        id: 21,
        name: "Cleansers",
        subCategories: [
          { id: 211, name: "Face Wash" },
          { id: 212, name: "Cleansing Oil" },
          { id: 213, name: "Micellar Water" },
          { id: 214, name: "Exfoliators" },
        ],
      },
      {
        id: 22,
        name: "Moisturizers",
        subCategories: [
          { id: 221, name: "Face Cream" },
          { id: 222, name: "Face Lotion" },
          { id: 223, name: "Night Cream" },
          { id: 224, name: "Eye Cream" },
        ],
      },
      {
        id: 23,
        name: "Serums & Treatments",
        subCategories: [
          { id: 231, name: "Anti-Aging" },
          { id: 232, name: "Vitamin C" },
          { id: 233, name: "Retinol" },
          { id: 234, name: "Hyaluronic Acid" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Hair Care",
    icon: "💇‍♀️",
    subCategories: [
      {
        id: 31,
        name: "Shampoo & Conditioner",
        subCategories: [
          { id: 311, name: "Shampoo" },
          { id: 312, name: "Conditioner" },
          { id: 313, name: "2-in-1 Products" },
          { id: 314, name: "Dry Shampoo" },
        ],
      },
      {
        id: 32,
        name: "Hair Treatments",
        subCategories: [
          { id: 321, name: "Hair Masks" },
          { id: 322, name: "Hair Oils" },
          { id: 323, name: "Leave-in Conditioner" },
          { id: 324, name: "Hair Serums" },
        ],
      },
      {
        id: 33,
        name: "Styling Products",
        subCategories: [
          { id: 331, name: "Hair Spray" },
          { id: 332, name: "Gel" },
          { id: 333, name: "Mousse" },
          { id: 334, name: "Heat Protectant" },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Fragrance",
    icon: "🌸",
    subCategories: [
      {
        id: 41,
        name: "Perfumes",
        subCategories: [
          { id: 411, name: "Women's Perfume" },
          { id: 412, name: "Men's Cologne" },
          { id: 413, name: "Unisex Fragrances" },
        ],
      },
      {
        id: 42,
        name: "Body Care",
        subCategories: [
          { id: 421, name: "Body Lotion" },
          { id: 422, name: "Body Wash" },
          { id: 423, name: "Body Oil" },
          { id: 424, name: "Body Scrub" },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Nail Care",
    icon: "💅",
    subCategories: [
      {
        id: 51,
        name: "Nail Polish",
        subCategories: [
          { id: 511, name: "Regular Polish" },
          { id: 512, name: "Gel Polish" },
          { id: 513, name: "Nail Art" },
        ],
      },
      {
        id: 52,
        name: "Nail Tools",
        subCategories: [
          { id: 521, name: "Nail Files" },
          { id: 522, name: "Cuticle Tools" },
          { id: 523, name: "Nail Clippers" },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "Tools & Brushes",
    icon: "🖌️",
    subCategories: [
      {
        id: 61,
        name: "Makeup Brushes",
        subCategories: [
          { id: 611, name: "Face Brushes" },
          { id: 612, name: "Eye Brushes" },
          { id: 613, name: "Brush Sets" },
        ],
      },
      {
        id: 62,
        name: "Beauty Tools",
        subCategories: [
          { id: 621, name: "Sponges" },
          { id: 622, name: "Tweezers" },
          { id: 623, name: "Mirrors" },
        ],
      },
    ],
  },
  {
    id: 7,
    name: "Men's Grooming",
    icon: "👨",
    subCategories: [
      {
        id: 71,
        name: "Skincare",
        subCategories: [
          { id: 711, name: "Face Wash" },
          { id: 712, name: "Moisturizer" },
          { id: 713, name: "Aftershave" },
        ],
      },
      {
        id: 72,
        name: "Hair Care",
        subCategories: [
          { id: 721, name: "Shampoo" },
          { id: 722, name: "Styling Products" },
          { id: 723, name: "Beard Care" },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Bath & Body",
    icon: "🛁",
    subCategories: [
      {
        id: 81,
        name: "Bath Products",
        subCategories: [
          { id: 811, name: "Bath Bombs" },
          { id: 812, name: "Bubble Bath" },
          { id: 813, name: "Bath Salts" },
        ],
      },
      {
        id: 82,
        name: "Body Care",
        subCategories: [
          { id: 821, name: "Body Lotion" },
          { id: 822, name: "Body Butter" },
          { id: 823, name: "Hand Cream" },
        ],
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
