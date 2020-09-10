import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { DialogData } from '../models/dialog-data';
import { Observable, of, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<any[]>(`https://proshop-api.herokuapp.com/items`);
    // return this.http.get(`${environment.apiUrl}/items`);
  }

  addItem(item: DialogData): Observable<any> {
    // return this.http.post<any[]>(`https://proshop-api.herokuapp.com/items`, { item });
    return this.http.post<any>(`${environment.apiUrl}/items/add`, item);
  }
}
