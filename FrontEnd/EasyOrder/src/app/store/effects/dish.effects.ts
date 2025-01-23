import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import {dishesLoaded, loadDishes} from '../actions/dish.actions';
import {DishService} from '../../services/dish.service';


@Injectable()
export class DishEffects {
  loadDishes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDishes),
      switchMap(() =>
        this.dishService.getAllDishes().pipe(
          map((dishes) => dishesLoaded({ dishes })),
          catchError((error) => of())
        )
      )
    )
  );

  constructor(private actions$: Actions, private dishService: DishService) {}
}
