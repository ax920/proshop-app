import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
// import { ItemsComponent } from '../items/items.component';

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

  constructor(public _router: Router) { }

  ngOnInit(): void {
  }

}
