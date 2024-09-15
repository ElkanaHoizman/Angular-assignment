import { createReducer, on } from '@ngrx/store';
import {
  loadItems,
  addItem,
  updateItem,
  deleteItem,
  loadItemsSuccess,
  loadItemsFailure,
} from '../store/items.actions';
import { Item } from '../models/item';

export interface ItemState {
  items: Item[];
}

export const initialState: ItemState = {
  items: [], // Initial 
};

export const itemReducer = createReducer(
  initialState,
  on(loadItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(addItem, (state, { item }) => ({
    ...state,
    items: [...state.items, item],
  })),
  on(updateItem, (state, { item }) => ({
    ...state,
    items: state.items.map((i) => (i.id === item.id ? item : i)),
  })),
  on(deleteItem, (state, { id }) => ({
    ...state,
    items: state.items.filter((i) => i.id !== id),
  })),
  on(loadItemsSuccess, (state, { items }) => ({ ...state, items })),
  on(loadItemsFailure, (state, { error }) => ({ ...state, error }))
);
