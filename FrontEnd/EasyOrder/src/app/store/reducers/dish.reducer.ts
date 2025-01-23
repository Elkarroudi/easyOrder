import { createReducer, on } from '@ngrx/store';
import { DishState } from '../app.state';
import {dishesLoaded, loadDishes, setSelectedCategory} from '../actions/dish.actions';

export const initialState: DishState = {
  dishes: [],
  filteredDishes: [],
  selectedCategory: null,
  loading: false,
};

export const dishReducer = createReducer(
  initialState,
  on(loadDishes, (state) => ({ ...state, loading: true })),
  on(dishesLoaded, (state, { dishes }) => ({
    ...state,
    dishes,
    filteredDishes: dishes,
    loading: false,
  })),
  on(setSelectedCategory, (state, { category }) => ({
    ...state,
    selectedCategory: category,
    filteredDishes: category
      ? state.dishes.filter((dish) => dish.categoryId === category.id)
      : state.dishes,
  }))
);
