import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Item } from '../models/item';
import { BehaviorSubject, filter, map, Observable, pipe, Subject } from 'rxjs';
import { environment } from 'environments/environment';
import { Store } from '@ngrx/store';
import {
  addItem,
  deleteItem,
  loadItems,
  updateItem,
} from '../store/items.actions';
import { ItemState } from '../store/items.reducer';
@Injectable({
  providedIn: 'root',
})
export class DataItemsService {
  public http = inject(HttpClient);
  private store = inject(Store<{ items: ItemState }>);
  public API: string = environment.apiUrl;

  setApiUrl(url: string) {
    this.API = url;
    this.getDate();
  }

  addNewItem(newItem: Item) {
    this.store.dispatch(addItem({ item: newItem }));
  }

  removeItem(id: number) {
    this.store.dispatch(deleteItem({ id }));
  }
  updateExistingItem(item: Item): void {
    this.store.dispatch(updateItem({ item }));
  }

  getItems(): Observable<Item[]> {
    return this.store.select((state) => state.items.items);
  }
  getDate() {
    this.store.dispatch(
      loadItems({
        items: [],
      })
    );
  }

  loadData(): Observable<Item[]> {
    return this.http.get<Item[]>(this.API);
  }
}
