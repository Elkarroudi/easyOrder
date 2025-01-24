import { createAction, props } from '@ngrx/store';
import { Dish } from '../../models/dish.model';
import { CartState } from '../../models/cart.model';

export const addToCart = createAction(
  '[Cart] Add Item',
  props<{ dish: Dish }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove Item',
  props<{ dishId: number }>()
);

export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ dishId: number; quantity: number }>()
);

export const clearCart = createAction(
  '[Cart] Clear Cart'
);

export const loadCart = createAction(
  '[Cart] Load Cart'
);

export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ cart: CartState }>()
);

export const loadCartFailure = createAction(
  '[Cart] Load Cart Failure',
  props<{ error: any }>()
);
