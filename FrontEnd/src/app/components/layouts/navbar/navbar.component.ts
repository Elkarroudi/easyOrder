import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCartItemCount } from '../../../store/cart/cart.selectors';
import * as CartActions from '../../../store/cart/cart.actions';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private readonly store = inject(Store);
  cartItemCount$ = this.store.select(selectCartItemCount);

  ngOnInit(): void {
    // Charger les données du panier depuis le localStorage au démarrage
    this.store.dispatch(CartActions.loadCart());
  }
}
