import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ItemsType } from '../types/Items.type';
import { ItemsFilterType } from '../types/Itemsfilter.type';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private readonly _URL = 'assets/items.json';

  constructor(private _http: HttpClient) {}

  public getItems(
    filtroItems?: ItemsFilterType
  ): Observable<ItemsType[]> {
    return this._http.get<ItemsType[]>(this._URL).pipe(
      map((items: ItemsType[]) => {
        if (!filtroItems) {
          return items;
        }
        return items.filter(item => {
          return Object.entries(filtroItems).every(([key, value]) => {
            const itemValue = String(item[key as keyof ItemsType] || '').trim();
            return itemValue.includes(String(value).trim());
          });
        });
      })
    );
  }

  public getItem(id: string): Observable<ItemsType> {
    return this.getItems().pipe(
      map((items: ItemsType[]) => {
        const item = items.find(item => item.id === id);
        if (!item) {
          throw new Error('Item not found');
        }
        return item;
      })
    );
  }
}
