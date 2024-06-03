import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemsType } from '../types/Items.type';
import { ItemsFilterType } from '../types/Itemsfilter.type';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private _URL = '../assets/item.json';

  constructor(private _http: HttpClient) {}

  public getListaEquipamento(
    filtroItems?: ItemsFilterType
  ): Observable<ItemsType[]> {
    let params = new HttpParams();
    if (filtroItems) {
      Object.entries(filtroItems).map(([key, value]) => {
        if (String(value).trim().length === 0) {
          return;
        }
        params = params.set(String(key), value);
      });
    }

    return this._http.get<ItemsType[]>(`${this._URL}/equipments`, {
      params,
    });
  }

  public getEquipamento(id: string): Observable<ItemsType> {
    return this._http.get<ItemsType>(`${this._URL}/equipments/${id}`);
  }
}
