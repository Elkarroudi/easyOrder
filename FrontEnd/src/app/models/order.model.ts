import { Dish } from './dish.model';

export interface OrderItem {
  dish: Dish;
  quantity: number;
}

export interface Order {
  id?: number;
  items: OrderItem[];
  total: number;
  tableNumber?: string;
  isDelivery: boolean;
  status?: 'PENDING' | 'PREPARING' | 'READY' | 'DELIVERED';
  createdAt?: Date;
}
