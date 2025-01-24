import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as OrderActions from './order.actions';
import { OrderService } from '../../services/order.service';

@Injectable()
export class OrderEffects {
  private actions$ = inject(Actions);
  private orderService = inject(OrderService);

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.createOrder),
      mergeMap(action => 
        this.orderService.createOrder(action.order).pipe(
          map(order => OrderActions.createOrderSuccess({ order })),
          catchError(error => of(OrderActions.createOrderFailure({ error: error.message })))
        )
      )
    )
  );

  getOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.getOrder),
      mergeMap(action =>
        this.orderService.getOrder(action.orderId).pipe(
          map(order => OrderActions.getOrderSuccess({ order })),
          catchError(error => of(OrderActions.getOrderFailure({ error: error.message })))
        )
      )
    )
  );
}
