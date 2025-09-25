export type Dish = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  isVegetarian: boolean;
  addoncat?: any; // optional – check if present, then show "Customizations available"
  quantity?: number;
};

export type Category = {
  id: number;
  name: string;
  dishes: Dish[];
};

export type ApiResponse = {
  categories: Category[];
};
