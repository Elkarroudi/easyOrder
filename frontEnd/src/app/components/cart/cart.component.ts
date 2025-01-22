import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cart, CartItem, DeliveryPerson } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart = signal<Cart>({
    items: [],
    totalAmount: 0,
    isDelivery: false
  });

  tables = Array.from({length: 20}, (_, i) => i + 1);
  
  deliveryPerson: DeliveryPerson = {
    id: 1,
    name: 'Mary Nguyen',
    phone: '0987657992',
    email: 'mary.nguyen@gmail.com',
    image: 'assets/images/delivery-person.jpg'
  };

  ngOnInit() {
    // Simuler des données de panier
    this.cart.set({
      items: [
        {
          id: 1,
          name: 'Berry Mojito',
          description: 'Homemade berry syrup',
          price: 10,
          image: 'assets/images/berry-mojito.jpg',
          quantity: 1
        },
        {
          id: 2,
          name: 'Cold noodles',
          description: 'Korean cold noodles soup',
          price: 10,
          image: 'assets/images/cold-noodles.jpg',
          quantity: 1
        },
        {
          id: 3,
          name: 'Beefstake',
          description: 'USDA beefstake',
          price: 100,
          image: 'assets/images/beefstake.jpg',
          quantity: 1
        }
      ],
      totalAmount: 120,
      isDelivery: false
    });
  }

  updateQuantity(item: CartItem, increment: boolean) {
    const updatedItems = this.cart().items.map(cartItem => {
      if (cartItem.id === item.id) {
        const newQuantity = increment ? cartItem.quantity + 1 : Math.max(1, cartItem.quantity - 1);
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });

    this.updateCart(updatedItems);
  }

  private updateCart(items: CartItem[]) {
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.cart.set({ ...this.cart(), items, totalAmount });
  }

  toggleDeliveryMode(isDelivery: boolean) {
    this.cart.set({ 
      ...this.cart(), 
      isDelivery,
      deliveryPerson: isDelivery ? this.deliveryPerson : undefined,
      tableNumber: isDelivery ? undefined : this.cart().tableNumber
    });
  }

  checkout() {
    console.log('Proceeding to checkout with cart:', this.cart());
    // Implement checkout logic
  }
}
