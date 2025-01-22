import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CartComponent, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <app-cart></app-cart>
  `
})
export class AppComponent {
  title = 'frontEnd';
}
