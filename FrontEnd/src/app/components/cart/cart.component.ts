import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartItem, DeliveryPerson } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  private cartState = new BehaviorSubject<CartItem[]>([
    {
      id: 1,
      name: 'Berry Mojito',
      description: 'Homemade berry syrup',
      price: 10,
      image: '/assets/images/BerryMojito.jpg',
      quantity: 1
    },
    {
      id: 2,
      name: 'Cold noodles',
      description: 'Korean cold noodles soup',
      price: 10,
      image: '/assets/images/ColdNoodles.jpg',
      quantity: 1
    },
    {
      id: 3,
      name: 'Beefstake',
      description: 'USDA beefstake',
      price: 100,
      image: '/assets/images/Beefstake.jpg',
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
    image: '/assets/images/MaryNguyen.jpg',
    rating: 4.8,
    deliveryTime: '30-45 min'
  };

  totalAmount = computed(() => 
    this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );

  constructor(private router: Router) {}

  updateQuantity(item: CartItem, increment: boolean) {
    const items = this.cartState.value;
    const index = items.findIndex(i => i.id === item.id);
    if (index !== -1) {
      const newQuantity = increment ? items[index].quantity + 1 : Math.max(1, items[index].quantity - 1);
      items[index] = { ...items[index], quantity: newQuantity };
      this.cartState.next([...items]);
    }
  }

  setDeliveryMode(isDelivery: boolean) {
    this.deliveryModeState.next(isDelivery);
    if (!isDelivery) {
      this.selectedTable = '';
    }
  }

  canCheckout(): boolean {
    if (!this.isDelivery() && !this.selectedTable) {
      return false;
    }
    return this.cartItems().some(item => item.quantity > 0);
  }

  checkout() {
    if (!this.canCheckout()) {
      return;
    }
    
    const orderDetails = {
      items: this.cartItems(),
      isDelivery: this.isDelivery(),
      selectedTable: this.selectedTable,
      deliveryPerson: this.isDelivery() ? this.deliveryPerson : null,
      totalAmount: this.totalAmount()
    };
    this.router.navigate(['/order-tracking']);
  }

  handleImageError(event: any) {
    const img = event.target;
    const alt = img.alt.toLowerCase();
    

    if (alt.includes('mojito')) {
      img.src = '/assets/images/BerryMojito.jpg';
    } else if (alt.includes('noodles')) {
      img.src = '/assets/images/ColdNoodles.jpg';
    } else if (alt.includes('beef') || alt.includes('steak')) {
      img.src = '/assets/images/Beefstake.jpg';
    } else {
      img.src = '/assets/images/beef.png';
    }
  }
}
