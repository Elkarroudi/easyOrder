import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Dish } from '../../models/dish.model';
import * as CartActions from '../../store/cart/cart.actions';

@Component({
  selector: 'app-food-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-menu.component.html',
})
export class FoodMenuComponent implements OnInit {
  private http = inject(HttpClient);
  private store = inject(Store);

  currentPage = 0;
  dishes: Dish[] = [];
  paginatedDishes: Dish[] = [];
  itemsPerPage = 8;
  totalPages = 0;

  ngOnInit(): void {
    this.fetchDishes();
  }

  fetchDishes(): void {
    this.http.get<Dish[]>('http://localhost:8085/api/dishes').subscribe(data => {
      console.log("dishes are", data)
      this.dishes = data;
      this.totalPages = Math.ceil(this.dishes.length / this.itemsPerPage);
      this.updatePaginatedDishes();
    });
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
