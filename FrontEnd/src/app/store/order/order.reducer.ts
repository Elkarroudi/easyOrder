import { createReducer, on } from '@ngrx/store';
import { OrderState } from '../app.state';
import * as OrderActions from './order.actions';

export const initialState: OrderState = {
  currentOrder: null,
  loading: false,
  error: null
};

export const orderReducer = createReducer(
  initialState,
  
  on(OrderActions.createOrder, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(OrderActions.createOrderSuccess, (state, { order }) => ({
    ...state,
    currentOrder: order,
    loading: false,
    error: null
  })),
  
  on(OrderActions.createOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  on(OrderActions.getOrder, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(OrderActions.getOrderSuccess, (state, { order }) => ({
    ...state,
    currentOrder: order,
    loading: false,
    error: null
  })),
  
  on(OrderActions.getOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
