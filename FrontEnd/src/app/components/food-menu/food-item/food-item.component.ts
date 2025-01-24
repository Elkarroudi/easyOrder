import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Dish } from '../../../models/dish.model';
import * as CartActions from '../../../store/cart/cart.actions';

@Component({
  selector: 'app-food-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css']
})
export class FoodItemComponent {
  @Input() item!: Dish;
  stars = [1, 2, 3, 4, 5];

  constructor(private store: Store) {}

  addToCart() {
    this.store.dispatch(CartActions.addToCart({ dish: this.item }));
  }

  handleImageError(event: any) {
    event.target.src = 'assets/images/placeholder.jpg'; // Image par défaut en cas d'erreur
  }
}
