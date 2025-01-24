import { createReducer, on } from '@ngrx/store';
import { CartState } from '../../models/cart.model';
import * as CartActions from './cart.actions';

export const initialState: CartState = {
  items: {},
  total: 0
};

const calculateTotal = (items: CartState['items']): number => {
  return Object.values(items).reduce((sum, item) => sum + (item.dish.price * item.quantity), 0);
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart, (state, { dish }) => {
    const currentQuantity = state.items[dish.id]?.quantity || 0;
    const newItems = {
      ...state.items,
      [dish.id]: {
        dish,
        quantity: currentQuantity + 1
      }
    };
    return {
      ...state,
      items: newItems,
      total: calculateTotal(newItems)
    };
  }),
  on(CartActions.removeFromCart, (state, { dishId }) => {
    const { [dishId]: removed, ...remainingItems } = state.items;
    return {
      ...state,
      items: remainingItems,
      total: calculateTotal(remainingItems)
    };
  }),
  on(CartActions.updateQuantity, (state, { dishId, quantity }) => {
    if (!state.items[dishId]) return state;
    
    const newItems = quantity <= 0
      ? (() => {
          const { [dishId]: removed, ...remaining } = state.items;
          return remaining;
        })()
      : {
          ...state.items,
          [dishId]: {
            ...state.items[dishId],
            quantity
          }
        };
    
    return {
      ...state,
      items: newItems,
      total: calculateTotal(newItems)
    };
  }),
  on(CartActions.clearCart, () => initialState),
  on(CartActions.loadCartSuccess, (state, { cart }) => ({
    ...state,
    ...cart
  }))
);
