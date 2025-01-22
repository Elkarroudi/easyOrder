import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { CartItem, DeliveryPerson } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-4xl font-bold text-[#B91C1C] mb-8">Your Cart</h1>
        
        <!-- Cart Items -->
        <div class="space-y-4">
          @for (item of cartItems(); track item.id) {
            <div class="bg-white rounded-xl p-4">
              <div class="flex justify-between items-center">
                <div class="flex space-x-4">
                  <img [src]="item.image" [alt]="item.name" 
                       class="w-16 h-16 rounded-lg object-cover">
                  <div>
                    <h3 class="font-semibold text-lg">{{ item.name }}</h3>
                    <p class="text-gray-600 text-sm">{{ item.description }}</p>
                    <p class="mt-1 text-gray-900">{{ item.price }}$</p>
                  </div>
                </div>
                <div class="flex items-center">
                  <button (click)="updateQuantity(item, false)" 
                          class="w-8 h-8 flex items-center justify-center text-[#B91C1C] border border-[#B91C1C] rounded-l-full">
                    -
                  </button>
                  <span class="w-8 h-8 flex items-center justify-center border-t border-b border-[#B91C1C]">
                    {{ item.quantity }}
                  </span>
                  <button (click)="updateQuantity(item, true)"
                          class="w-8 h-8 flex items-center justify-center text-[#B91C1C] border border-[#B91C1C] rounded-r-full">
                    +
                  </button>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- Delivery Options -->
        <div class="mt-8 space-y-4">
          <div class="flex space-x-4">
            <label class="flex-1 cursor-pointer">
              <input type="radio" 
                     [checked]="!isDelivery()" 
                     (change)="setDeliveryMode(false)"
                     class="hidden">
              <div class="flex items-center space-x-2">
                <div class="w-6 h-6 rounded-full border-2 border-[#B91C1C] flex items-center justify-center">
                  @if (!isDelivery()) {
                    <div class="w-4 h-4 rounded-full bg-[#B91C1C]"></div>
                  }
                </div>
                <span class="text-lg">In Restaurant</span>
              </div>
            </label>
            
            <label class="flex-1 cursor-pointer">
              <input type="radio" 
                     [checked]="isDelivery()" 
                     (change)="setDeliveryMode(true)"
                     class="hidden">
              <div class="flex items-center space-x-2">
                <div class="w-6 h-6 rounded-full border-2 border-[#B91C1C] flex items-center justify-center">
                  @if (isDelivery()) {
                    <div class="w-4 h-4 rounded-full bg-[#B91C1C]"></div>
                  }
                </div>
                <span class="text-lg">To be Delivered</span>
              </div>
            </label>
          </div>

          @if (!isDelivery()) {
            <div class="relative">
              <select [(ngModel)]="selectedTable" 
                      class="w-full h-12 px-4 appearance-none bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#B91C1C]">
                <option value="" disabled selected>Table</option>
                @for (table of tables; track table) {
                  <option [value]="table">Table {{ table }}</option>
                }
              </select>
              <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg class="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          }

          @if (isDelivery()) {
            <div class="mt-4">
              <h4 class="text-[#B91C1C] font-medium mb-4">Your Delivery Person Is:</h4>
              <div class="bg-white rounded-xl p-4">
                <div class="flex items-center space-x-4">
                  <img [src]="deliveryPerson.image" 
                       [alt]="deliveryPerson.name"
                       class="w-16 h-16 rounded-full object-cover">
                  <div>
                    <p class="font-medium text-lg">{{ deliveryPerson.name }}</p>
                    <p class="text-gray-600">{{ deliveryPerson.phone }}</p>
                    <p class="text-gray-600">{{ deliveryPerson.email }}</p>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- Checkout Button -->
        <button (click)="checkout()"
                class="w-full bg-[#B91C1C] text-white text-lg font-medium py-4 rounded-full mt-8">
          Checkout : {{ totalAmount() }}$
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CartComponent {
  constructor(private router: Router) {}

  private cartState = new BehaviorSubject<CartItem[]>([
    {
      id: 1,
      name: 'Berry Mojito',
      description: 'Homemade berry syrup',
      price: 10,
      image: 'assets/images/BerryMojito.jpg',
      quantity: 1
    },
    {
      id: 2,
      name: 'Cold noodles',
      description: 'Korean cold noodles soup',
      price: 10,
      image: 'assets/images/ColdNoodles.jpg',
      quantity: 1
    },
    {
      id: 3,
      name: 'Beefstake',
      description: 'USDA beefstake',
      price: 100,
      image: 'assets/images/Beefstake.jpg',
      quantity: 1
    }
  ]);

  private deliveryModeState = new BehaviorSubject<boolean>(false);

  cartItems = toSignal(this.cartState, { initialValue: [] });
  isDelivery = toSignal(this.deliveryModeState, { initialValue: false });
  
  selectedTable = '';
  tables = Array.from({ length: 20 }, (_, i) => i + 1);
  
  deliveryPerson: DeliveryPerson = {
    id: 1,
    name: 'Mary Nguyen',
    phone: '0987657992',
    email: 'mary.nguyen@gmail.com',
    image: 'assets/images/MaryNguyen.jpg'
  };

  totalAmount = computed(() => 
    this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );

  updateQuantity(item: CartItem, increment: boolean) {
    const updatedItems = this.cartItems().map(cartItem => {
      if (cartItem.id === item.id) {
        const newQuantity = increment ? cartItem.quantity + 1 : Math.max(1, cartItem.quantity - 1);
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });
    this.cartState.next(updatedItems);
  }

  setDeliveryMode(isDelivery: boolean) {
    this.deliveryModeState.next(isDelivery);
    if (isDelivery) {
      this.selectedTable = '';
    }
  }

  checkout() {
    const orderData = {
      items: this.cartItems(),
      totalAmount: this.totalAmount(),
      isDelivery: this.isDelivery(),
      tableNumber: this.selectedTable,
      deliveryPerson: this.isDelivery() ? this.deliveryPerson : null
    };
    console.log('Processing checkout:', orderData);
    
    // Redirection vers la page de suivi
    this.router.navigate(['/order-tracking']);
  }
}
