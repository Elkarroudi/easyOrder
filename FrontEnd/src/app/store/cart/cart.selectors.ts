import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from '../../models/cart.model';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState) => Object.entries(state.items).map(([id, item]) => ({
    ...item,
    id: parseInt(id)
  }))
);

export const selectCartTotal = createSelector(
  selectCartState,
  (state: CartState) => Object.values(state.items).reduce(
    (total, item) => total + (item.dish.price * item.quantity),
    0
  )
);

export const selectCartItemCount = createSelector(
  selectCartState,
  (state: CartState) => Object.values(state.items).reduce(
    (count, item) => count + item.quantity,
    0
  )
);
