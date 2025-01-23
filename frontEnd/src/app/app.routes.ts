import { Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { OrderTrackingComponent } from './components/order-tracking/order-tracking.component';
import { FirstSectionComponent } from './components/first-section/first-section.component';

export const routes: Routes = [
  { path: '', component: FirstSectionComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order-tracking', component: OrderTrackingComponent },
  { path: '**', redirectTo: '' }
];
