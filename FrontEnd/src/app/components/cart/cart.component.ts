import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../models/cart.model';
import { DeliveryPerson } from '../../models/delivery-person.model';
import { selectCartItems } from '../../store/cart/cart.selectors';
import * as CartActions from '../../store/cart/cart.actions';
import * as OrderActions from '../../store/order/order.actions';
import { selectCurrentOrder } from '../../store/order/order.selectors';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;
  totalAmount$: Observable<number>;
  isDelivery: boolean = false;
  selectedTable: string = '';
  deliveryPerson: DeliveryPerson = {
    id: 1,
    name: 'John Doe',
    phone: '+1234567890',
    email: 'john@example.com',
    image: 'assets/images/delivery-person.jpg',
    rating: 4.5,
    deliveryTime: '30-45 min'
  };
  tables = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  constructor(
    private store: Store<AppState>,
    private orderService: OrderService,
    private router: Router
  ) {
    this.cartItems$ = this.store.select(selectCartItems);
    this.totalAmount$ = this.store.select(state => {
      const items = state.cart.items;
      return items.reduce((total: number, item: CartItem) => {
        return total + (item.dish.price * item.quantity);
      }, 0);
    });
  }

  ngOnInit() {}

  handleImageError(event: any) {
    event.target.src = '../../assets/images/default-dish.jpg';
  }

  updateQuantity(dishId: number, increment: boolean) {
    this.cartItems$.subscribe(items => {
      const item = items.find(i => i.dish.id === dishId);
      if (item) {
        const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
        if (newQuantity >= 0) {
          this.store.dispatch(CartActions.updateQuantity({ dishId, quantity: newQuantity }));
        }
      }
    });
  }

  setDeliveryMode(delivery: boolean) {
    this.isDelivery = delivery;
    if (delivery) {
      this.selectedTable = '';
    }
  }

  canCheckout(): boolean {
    return this.isDelivery || (!!this.selectedTable);
  }

  checkout() {
    if (!this.canCheckout()) return;

    this.cartItems$.subscribe(items => {
      const total = items.reduce((sum: number, item: CartItem) => sum + (item.dish.price * item.quantity), 0);
      const order = {
        items: items.map(item => ({
          dish: item.dish,
          quantity: item.quantity
        })),
        total,
        tableNumber: this.selectedTable,
        isDelivery: this.isDelivery
      };

      this.store.dispatch(OrderActions.createOrder({ order }));
      
      this.store.select(selectCurrentOrder).subscribe((createdOrder: Order | null) => {
        if (createdOrder) {
          this.store.dispatch(CartActions.clearCart());
          this.router.navigate(['/order-tracking', createdOrder.id]);
        }
      });
    });
  }

  removeFromCart(dishId: number): void {
    this.store.dispatch(CartActions.removeFromCart({ dishId }));
  }
}
