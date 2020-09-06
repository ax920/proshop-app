import { Component, OnInit } from '@angular/core';
import { InventoryService } from './inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  inventory: any[];
  displayedColumns: string[];
  isDataAvailable: boolean = false;

  constructor(public inventoryService: InventoryService) { }

  ngOnInit(): void {
    // this.inventoryService.getInventory().subscribe(inventory => {
    //   this.inventory = inventory;
    //   this.isDataAvailable = true;
    //   console.log(this.inventory);
    // })
  }

}
