export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  categoryId: number;
  rating: number;
}
