import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  getInventory() {
    return this.http.get<any[]>(`https://proshop-api.herokuapp.com/inventory`);
    // return this.http.get(`${environment.apiUrl}/inventory`);
  }
}
