import { CartItem } from '../models/cart.model';
import { Order } from '../models/order.model';

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

export interface OrderState {
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
}

export interface AppState {
  cart: CartState;
  order: OrderState;
}
