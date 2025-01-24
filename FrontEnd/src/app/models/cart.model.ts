import { Dish } from './dish.model';

export interface CartItem {
  dish: Dish;
  quantity: number;
  id?: number;
}

export interface DeliveryPerson {
  id: number;
  name: string;
  phone: string;
  email: string;
  image: string;
  rating: number;
  deliveryTime: string;
}

export interface CartState {
  items: { [key: number]: CartItem };
  total: number;
}
