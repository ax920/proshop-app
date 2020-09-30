import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) { }

  getSales() {
    // return this.http.get<any[]>(`https://proshop-api.herokuapp.com/sales`);
    return this.http.get<any[]>(`${environment.apiUrl}/sales`);
  }

  purchaseItem(body: Object) {
    return this.http.post(`${environment.apiUrl}/sales/purchase`, body);
  }
}
