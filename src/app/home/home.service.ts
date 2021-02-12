import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  introspect(token: any, token_type_hint: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/introspect`, {
      token: token,
      token_type_hint: token_type_hint
    });
  }
}
