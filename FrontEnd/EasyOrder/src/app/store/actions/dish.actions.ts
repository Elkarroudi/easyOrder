import {createAction, props} from '@ngrx/store';
import {Category} from '../../models/category.model';
import {Dish} from '../../models/dish.model';

export const loadDishes = createAction('[Dish] Load Dishes');
export const dishesLoaded = createAction(
  '[Dish] Dishes Loaded',
  props<{ dishes: Dish[] }>()
);

export const setSelectedCategory = createAction(
  '[Dish] Set Selected Category',
  props<{ category: Category | null }>()
);
