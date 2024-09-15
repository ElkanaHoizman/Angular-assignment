import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadItems,
  addItem,
  updateItem,
  deleteItem,
  loadItemsSuccess,
  loadItemsFailure,
} from '../store/items.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DataItemsService } from '../services/data-items.service';
@Injectable()
export class ItemEffects {
  private dataItemsService = inject(DataItemsService);
  private actions$ = inject(Actions);
  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadItems),
      mergeMap(() =>
        this.dataItemsService.loadData().pipe(
          map((items) => loadItemsSuccess({ items })),
          catchError((error) => of(loadItemsFailure({ error })))
        )
      )
    )
  );
}
