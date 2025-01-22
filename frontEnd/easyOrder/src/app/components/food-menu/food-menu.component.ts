import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Dish} from '../../models/dish.model';

@Component({
  selector: 'app-food-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-menu.component.html'
})
export class FoodMenuComponent implements OnInit {
  private http = inject(HttpClient);

  dishes: Dish[] = [];
  cartItems: { [key: number]: number } = {};
  total = 0;

  ngOnInit(): void {
    this.fetchDishes();
  }

  fetchDishes(): void {
    this.http.get<Dish[]>('http://localhost:8085/api/dishes').subscribe(data => {
      console.log("Full data response: ", data);

      console.log("rating is ", data.map(dish => dish.rating));
      this.dishes = data;
    });
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

  private calculateTotal(): void {
    this.total = Object.entries(this.cartItems).reduce(
      (sum, [id, quantity]) =>
        sum + quantity * (this.dishes.find(d => d.id === +id)?.price || 0),
      0
    );
  }
}
