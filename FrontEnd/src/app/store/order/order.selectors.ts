import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from '../app.state';

export const selectOrderState = createFeatureSelector<OrderState>('order');

export const selectCurrentOrder = createSelector(
  selectOrderState,
  (state) => state.currentOrder
);

export const selectOrderLoading = createSelector(
  selectOrderState,
  (state) => state.loading
);

export const selectOrderError = createSelector(
  selectOrderState,
  (state) => state.error
);
