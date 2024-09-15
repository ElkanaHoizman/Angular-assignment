import { createAction, on, props } from '@ngrx/store';
import { Item } from '../models/item';

// Action to load items
export const loadItems = createAction(
  '[Items] Load Items',
  props<{ items: Item[] }>()
);

// Action to add a new item
export const addItem = createAction(
  '[Items] Add Item',
  props<{ item: Item }>()
);

// Action to update an item
export const updateItem = createAction(
  '[Items] Update Item',
  props<{ item: Item }>()
);

// Action to delete an item
export const deleteItem = createAction(
  '[Items] Delete Item',
  props<{ id: number }>()
);
export const loadItemsSuccess = createAction(
  '[Items] Load Items Success',
  props<{ items: Item[] }>()
);
export const loadItemsFailure = createAction(
  '[Items] Load Items Failure',
  props<{ error: any }>()
);
