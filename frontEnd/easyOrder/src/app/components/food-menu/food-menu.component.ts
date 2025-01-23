import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Observable, Subscription } from 'rxjs';

import { Dish } from '../../models/dish.model';
import { Category } from '../../models/category.model';
import { selectFilteredDishes, selectSelectedCategory } from '../../store/selectors/dish.selectors';
import { loadDishes, setSelectedCategory } from '../../store/actions/dish.actions';

@Component({
  selector: 'app-food-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-menu.component.html'
})
export class FoodMenuComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private subscription = new Subscription();

  dishes$: Observable<Dish[]> = this.store.select(selectFilteredDishes);
  selectedCategory$: Observable<Category | null> = this.store.select(selectSelectedCategory);

  dishes: Dish[] = [];
  currentPage = 0;
  paginatedDishes: Dish[] = [];
  cartItems: { [key: number]: number } = {};
  total = 0;
  itemsPerPage = 8;
  totalPages = 0;

  ngOnInit(): void {
    this.store.dispatch(loadDishes());

    this.subscription.add(
      this.dishes$.subscribe(dishes => {
        this.dishes = dishes;
        this.updatePaginatedDishes();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCategorySelect(category: Category | null): void {
    this.store.dispatch(setSelectedCategory({ category }));
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedDishes();
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePaginatedDishes();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updatePaginatedDishes();
    }
  }

  updateQuantity(id: number, delta: number): void {
    const currentQty = this.cartItems[id] || 0;
    const newQty = currentQty + delta;

    if (newQty <= 0) {
      delete this.cartItems[id];
    } else {
      this.cartItems[id] = newQty;
    }

    this.calculateTotal();
  }

  private updatePaginatedDishes(): void {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedDishes = this.dishes.slice(start, end);
  }

  private calculateTotal(): void {
    this.total = Object.entries(this.cartItems).reduce(
      (sum, [id, quantity]) =>
        sum + quantity * (this.dishes.find(d => d.id === +id)?.price || 0),
      0
    );
  }
}
