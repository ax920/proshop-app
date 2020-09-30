import { Component, OnInit } from '@angular/core';
import { SalesService } from './sales.service'

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  allSales: any[];
  displayedColumns: string[] = ['id', 'item_id', 'name', 'buy_price', 'sell_price', 'quantity', 'category', 'total'];
  isDataAvailable: boolean = false;

  constructor(public salesService: SalesService) { }

  ngOnInit(): void {
    this.salesService.getSales().subscribe(sales => {
      this.allSales = sales.sort(function (a, b) {
        return a.id - b.id || a.name.localeCompare(b.name);
      });
      this.isDataAvailable = true;
    });
  }
}
