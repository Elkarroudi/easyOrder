import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Dish } from '../../models/dish.model';
import { DishService } from '../../services/dish.service';
import { CategoryService } from '../../services/category.service';
import * as CartActions from '../../store/cart/cart.actions';

@Component({
  selector: 'app-food-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.css']
})
export class FoodMenuComponent implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private store = inject(Store);

  currentPage = 0;
  dishes: Dish[] = [];
  paginatedDishes: Dish[] = [];
  itemsPerPage = 8;
  totalPages = 0;
  private categorySubscription?: Subscription;

  constructor(
    private dishService: DishService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadAllDishes();

    // Subscribe to category changes
    this.categorySubscription = this.categoryService.selectedCategory$
      .subscribe(category => {
        if (category) {
          this.loadDishesByCategory(category.id);
        } else {
          this.loadAllDishes();
        }
      });
  }

  ngOnDestroy(): void {
    this.categorySubscription?.unsubscribe();
  }

  loadAllDishes(): void {
    this.dishService.getAllDishes().subscribe({
      next: (dishes) => {
        this.dishes = dishes;
        this.updatePagination();
      },
      error: (error) => {
        console.error('Error loading dishes:', error);
      }
    });
  }

  loadDishesByCategory(categoryId: number): void {
    this.dishService.getDishesByCategory(categoryId).subscribe({
      next: (dishes) => {
        this.dishes = dishes;
        this.currentPage = 0; // Reset to first page when changing category
        this.updatePagination();
      },
      error: (error) => {
        console.error('Error loading dishes by category:', error);
      }
    });
  }

  private updatePagination(): void {
    this.totalPages = Math.ceil(this.dishes.length / this.itemsPerPage);
    this.updatePaginatedDishes();
  }

  updatePaginatedDishes(): void {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedDishes = this.dishes.slice(start, end);
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedDishes();
    }
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

  addToCart(dish: Dish): void {
    this.store.dispatch(CartActions.addToCart({ dish }));
  }
}
