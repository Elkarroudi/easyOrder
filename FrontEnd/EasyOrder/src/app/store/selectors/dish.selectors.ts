import { createSelector } from '@ngrx/store';
import { AppState, DishState } from '../app.state';

export const selectDishState = (state: AppState) => state.dishes;

export const selectDishes = createSelector(
  selectDishState,
  (state: DishState) => state.dishes
);

export const selectFilteredDishes = createSelector(
  selectDishState,
  (state: DishState) => state.filteredDishes
);

export const selectSelectedCategory = createSelector(
  selectDishState,
  (state: DishState) => state.selectedCategory
);
