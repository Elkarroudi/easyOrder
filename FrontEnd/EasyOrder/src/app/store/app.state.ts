import {Dish} from '../models/dish.model';
import {Category} from '../models/category.model';

export interface AppState {
  categories: CategoryState;
  dishes: DishState;
}

export interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
}

export interface DishState {
  dishes: Dish[];
  filteredDishes: Dish[];
  selectedCategory: Category | null;
  loading: boolean;
}

