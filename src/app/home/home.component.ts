import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ItemsComponent } from '../items/items.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dashboardUrl: string = '/dashboard';
  itemsUrl: string = '/items';
  inventoryUrl: string = '/i;nventory';
  salesUrl: string = '/sales';
  homeUrl: string = '/'; // temporary for testing

  constructor(public _router: Router) { }

  ngOnInit(): void {
  }

}
