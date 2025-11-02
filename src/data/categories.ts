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
    name: "Endella Natural Beauty Products",
  },
  {
    id: 2,
    name: "EDL SHIRTS / VALID SET",
  },
  {
    id: 3,
    name: "SHORTS",
  },
  {
    id: 4,
    name: "EDL SPECIAL",
  },
  {
    id: 5,
    name: "EDL ROYALTY",
  },
  {
    id: 6,
    name: "JACKET / HOODIE",
  },
  {
    id: 7,
    name: "PHANTOM TROUSER",
  },
  {
    id: 8,
    name: "KIMONO",
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
