import { Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { OrderTrackingComponent } from './components/order-tracking/order-tracking.component';

export const routes: Routes = [
  { path: '', redirectTo: '/cart', pathMatch: 'full' },
  { path: 'cart', component: CartComponent },
  { path: 'order-tracking', component: OrderTrackingComponent }
];
