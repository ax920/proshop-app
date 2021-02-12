import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { HomeService } from './home.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeUrl: string = '/';
  dashboardUrl: string = '/dashboard';
  itemsUrl: string = '/items';
  inventoryUrl: string = '/inventory';
  salesUrl: string = '/sales';

  username: string;
  isLoggedIn: boolean;

  constructor(public _router: Router, public homeService: HomeService, private http: HttpClient) {
  }

  ngOnInit(): void {
    if (this.isLoggedIn == null || !this.isLoggedIn) {
      this.checkLoggedIn().subscribe(res => {
        this.isLoggedIn = res.active;
      });
    }
  }

  checkLoggedIn(): Observable<any> {
    const access_token = sessionStorage.getItem('access_token');
    if (access_token == null) {
      this.login();
    }
    return this.homeService.introspect(access_token, 'access_token');;
  }

  login() {
    console.log("login")
    const client_id = environment.client_id;
    window.localStorage.setItem('retUrl', window.location.href);
    window.location.href = `https://dev-511043.okta.com/oauth2/v1/authorize?client_id=${client_id}&nonce=iloveparis&redirect_uri=${environment.appUrl}/authorization-code/callback&response_type=code&scope=openid&state=iloveparis`;
  }

  logout() {
    console.log("logout")
  }

}
