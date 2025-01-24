import { createAction, props } from '@ngrx/store';
import { Order } from '../../models/order.model';

export const createOrder = createAction(
  '[Order] Create Order',
  props<{ order: Order }>()
);

export const createOrderSuccess = createAction(
  '[Order] Create Order Success',
  props<{ order: Order }>()
);

export const createOrderFailure = createAction(
  '[Order] Create Order Failure',
  props<{ error: string }>()
);

export const getOrder = createAction(
  '[Order] Get Order',
  props<{ orderId: number }>()
);

export const getOrderSuccess = createAction(
  '[Order] Get Order Success',
  props<{ order: Order }>()
);

export const getOrderFailure = createAction(
  '[Order] Get Order Failure',
  props<{ error: string }>()
);
