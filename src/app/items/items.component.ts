import { Component, OnInit } from '@angular/core';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  allItems: any[];
  displayedColumns: string[] = ['id', 'name', 'buy_price', 'sell_price', 'category', 'actions'];
  isDataAvailable: boolean = false;

  constructor(public itemsService: ItemsService) { }

  ngOnInit(): void {
    this.itemsService.getItems().subscribe(items => {
      this.allItems = items;
      this.isDataAvailable = true;
      console.log(this.allItems);
    });
  }
}
