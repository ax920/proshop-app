import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { DialogData } from '../_models/dialog-data';
import { Item } from '../_models/item';
import { Observable, of, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  getItems(): any {
    // return this.http.get<any[]>(`https://proshop-api.herokuapp.com/items`);
    return this.http.get(`${environment.apiUrl}/items`);
  }

  getItemById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/items/${id}`);
  }

  addItem(item: DialogData): Observable<Item> {
    // return this.http.post<any[]>(`https://proshop-api.herokuapp.com/items`, { item });
    return this.http.post<Item>(`${environment.apiUrl}/items/add`, item);
  }

  updateItem(id: number, item: DialogData): Observable<any> {
    return this.http.put(`${environment.apiUrl}/items/${id}`, item);
  }

  subtractQuantity(item: any) {
    return this.http.post(`${environment.apiUrl}/items/quantity`, item)
  }
}
