import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CartComponent],
  template: `
    <app-cart></app-cart>
  `
})
export class AppComponent {
  title = 'frontEnd';
}
