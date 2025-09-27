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

export type MenuResponseType = {
  categories: Category[];
};

export type CartItemOperationType = 'increment' | 'decrement';

export const passwordRegexPattern = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/
);
