import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<any[]>(`https://proshop-api.herokuapp.com/items`);
    // return this.http.get(`${environment.apiUrl}/items`);
  }
}
