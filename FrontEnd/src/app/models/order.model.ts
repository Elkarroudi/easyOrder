import { CartItem } from './cart.model';

export interface Order {
  id?: number;
  items: CartItem[];
  total: number;
  tableNumber?: string;
  isDelivery: boolean;
  status: OrderStatus;
  createdAt: Date;
  deliveryPersonId?: number;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED'
}
