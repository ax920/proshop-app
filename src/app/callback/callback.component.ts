import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  code: String;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAuthCode();
    this.getTokens().subscribe((res: any) => {
      sessionStorage.setItem("access_token", res.access_token);
      sessionStorage.setItem("id_token", res.id_token);
      sessionStorage.setItem("expires_in", res.expires_in);
      sessionStorage.setItem("scope", res.scope);
      sessionStorage.setItem("token_type", res.token_type);
      // navigate back to where you came from
      const retUrl = localStorage.getItem("retUrl");
      if (retUrl != null) {
        window.location.href = localStorage.getItem("retUrl");
      }
      // TODO
      // handle errors
    });


  }

  getAuthCode() {
    const params: String = window.location.href.split("?")[1];
    const codeString = params.substring(5, params.length);
    const index = codeString.indexOf("&");
    this.code = codeString.substring(0, index);
    console.log(this.code);
  }

  getTokens() {
    const app_url = environment.appUrl;
    const params = {
      'code': this.code,
      'grant_type': 'authorization_code',
      'redirect_uri': `${app_url}/authorization-code/callback`
    }
    return this.http.post(`${environment.apiUrl}/tokens`, params);
  }

}
