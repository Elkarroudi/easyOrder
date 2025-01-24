import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart.model';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selectors';
import * as CartActions from '../../store/cart/cart.actions';
import { OrderService } from '../../services/order.service';
import { Dish } from '../../models/dish.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="max-w-2xl mx-auto pt-16 px-6 pb-6 bg-gray-50 min-h-screen">
      <h1 class="text-4xl font-bold text-[#B91C1C] mb-8">Your Cart</h1>
      
      @if (cartItems$ | async; as items) {
        @if (items.length === 0) {
          <div class="text-center py-8">
            <p class="text-gray-500">Your cart is empty</p>
            <a routerLink="/" class="text-red-700 hover:text-red-800">Continue Shopping</a>
          </div>
        } @else {
          @for (item of items; track item.dish.id) {
            <div class="bg-white rounded-2xl p-4 mb-4">
              <div class="flex items-center justify-between">
                <div class="flex gap-4">
                  <img [src]="'../../assets/images' + item.dish.image" 
                       [alt]="item.dish.name"
                       class="w-20 h-20 rounded-xl object-cover"
                       (error)="handleImageError($event)">
                  <div>
                    <h3 class="text-lg font-medium">{{ item.dish.name }}</h3>
                    <p class="text-sm text-gray-500">{{ item.dish.description }}</p>
                    <p class="mt-1 font-medium">{{ item.dish.price }}$</p>
                  </div>
                </div>
                <div class="flex items-center border border-[#B91C1C] rounded-full">
                  <button (click)="updateQuantity(item.dish.id, item.quantity - 1)" 
                          class="w-8 h-8 flex items-center justify-center text-[#B91C1C] font-medium">
                    -
                  </button>
                  <span class="w-8 text-center">{{ item.quantity }}</span>
                  <button (click)="updateQuantity(item.dish.id, item.quantity + 1)"
                          class="w-8 h-8 flex items-center justify-center text-[#B91C1C] font-medium">
                    +
                  </button>
                </div>
              </div>
            </div>
          }

          <div class="mt-8">
            <div class="flex gap-4 mb-6">
              <label class="flex-1 relative">
                <input type="radio" 
                       [checked]="!isDelivery"
                       (change)="setDeliveryMode(false)"
                       class="absolute opacity-0 w-full h-full cursor-pointer peer">
                <div class="py-3.5 px-4 rounded-xl border border-gray-200 flex items-center gap-3 transition-colors"
                     [class.bg-[#B91C1C]]="!isDelivery"
                     [class.text-white]="!isDelivery"
                     [class.border-[#B91C1C]]="!isDelivery"
                     [class.bg-white]="isDelivery"
                     [class.text-gray-700]="isDelivery">
                  <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                       [class.border-white]="!isDelivery"
                       [class.border-gray-300]="isDelivery">
                    @if (!isDelivery) {
                      <div class="w-2.5 h-2.5 bg-white rounded-full"></div>
                    }
                  </div>
                  <span class="font-medium">In Restaurant</span>
                </div>
              </label>

              <label class="flex-1 relative">
                <input type="radio"
                       [checked]="isDelivery"
                       (change)="setDeliveryMode(true)"
                       class="absolute opacity-0 w-full h-full cursor-pointer peer">
                <div class="py-3.5 px-4 rounded-xl border border-gray-200 flex items-center gap-3 transition-colors"
                     [class.bg-[#B91C1C]]="isDelivery"
                     [class.text-white]="isDelivery"
                     [class.border-[#B91C1C]]="isDelivery"
                     [class.bg-white]="!isDelivery"
                     [class.text-gray-700]="!isDelivery">
                  <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                       [class.border-white]="isDelivery"
                       [class.border-gray-300]="!isDelivery">
                    @if (isDelivery) {
                      <div class="w-2.5 h-2.5 bg-white rounded-full"></div>
                    }
                  </div>
                  <span class="font-medium">To be Delivered</span>
                </div>
              </label>
            </div>

            @if (!isDelivery) {
              <div class="mb-6">
                <select [(ngModel)]="selectedTable" 
                        class="w-full p-4 rounded-xl border border-gray-200 bg-white text-gray-700 appearance-none">
                  <option value="">Table</option>
                  @for (table of tables; track table) {
                    <option [value]="table">Table {{ table }}</option>
                  }
                </select>
              </div>
            }

            @if (isDelivery) {
              <div class="mb-6">
                <p class="text-[#B91C1C] font-medium mb-3">Your Delivery Person Is:</p>
                <div class="bg-white rounded-xl p-4 flex items-center gap-4">
                  <img [src]="deliveryPerson.image" 
                       [alt]="deliveryPerson.name"
                       class="w-14 h-14 rounded-full object-cover">
                  <div>
                    <p class="font-medium">{{ deliveryPerson.name }}</p>
                    <p class="text-gray-600">{{ deliveryPerson.phone }}</p>
                    <p class="text-gray-600">{{ deliveryPerson.email }}</p>
                  </div>
                </div>
              </div>
            }

            <button (click)="checkout()"
                    [disabled]="!canCheckout()"
                    class="w-full py-4 bg-[#B91C1C] text-white rounded-xl font-medium text-lg disabled:opacity-50">
              Checkout : {{ totalAmount$ | async | number:'1.0-2' }}$
            </button>
          </div>
        }
      }
    </div>
  `
})
export class CartComponent implements OnInit {
  private store = inject(Store);
  private orderService = inject(OrderService);
  private router = inject(Router);

  cartItems$: Observable<CartItem[]>;
  totalAmount$: Observable<number>;
  isDelivery = false;
  selectedTable = '';
  tables = Array.from({ length: 20 }, (_, i) => i + 1);

  deliveryPerson = {
    id: 1,
    name: 'Mary Nguyen',
    phone: '0987657992',
    email: 'mary.nguyen@gmail.com',
    image: '/assets/images/MaryNguyen.jpg',
    rating: 4.8,
    deliveryTime: '30-45 min'
  };

  constructor() {
    this.cartItems$ = this.store.select(selectCartItems);
    this.totalAmount$ = this.store.select(selectCartTotal);
  }

  ngOnInit() {}

  handleImageError(event: any) {
    event.target.src = '../../assets/images/default-dish.jpg';
  }

  updateQuantity(dishId: number, newQuantity: number) {
    if (newQuantity >= 0) {
      this.store.dispatch(CartActions.updateQuantity({ dishId, quantity: newQuantity }));
    }
  }

  setDeliveryMode(isDelivery: boolean) {
    this.isDelivery = isDelivery;
    if (isDelivery) {
      this.selectedTable = '';
    }
  }

  canCheckout(): boolean {
    return this.isDelivery || (!!this.selectedTable);
  }

  checkout() {
    if (!this.canCheckout()) return;

    this.cartItems$.subscribe(items => {
      this.totalAmount$.subscribe(total => {
        const order = {
          items: items.map(item => ({
            dish: item.dish,
            quantity: item.quantity
          })),
          total,
          tableNumber: this.selectedTable,
          isDelivery: this.isDelivery,
          status: 'PENDING',
          createdAt: new Date()
        };

        this.orderService.createOrder(order).subscribe(
          createdOrder => {
            this.store.dispatch(CartActions.clearCart());
            this.router.navigate(['/order-tracking', createdOrder.id]);
          }
        );
      });
    });
  }
}
