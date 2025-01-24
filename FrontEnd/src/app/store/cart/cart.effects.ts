import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, map } from 'rxjs/operators';
import * as CartActions from './cart.actions';
import { selectCartState } from './cart.selectors';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);

  saveCart$ = createEffect(() => 
    this.actions$.pipe(
      ofType(
        CartActions.addToCart,
        CartActions.removeFromCart,
        CartActions.updateQuantity,
        CartActions.clearCart
      ),
      tap(() => {
        this.store.select(selectCartState).subscribe(cartState => {
          localStorage.setItem('cart', JSON.stringify(cartState));
        }).unsubscribe();
      })
    ),
    { dispatch: false }
  );

  loadCart$ = createEffect(() => 
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      map(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const cartState = JSON.parse(savedCart);
          return CartActions.loadCartSuccess({ cart: cartState });
        }
        return CartActions.loadCartSuccess({ cart: { items: {}, total: 0 } });
      })
    )
  );
}
