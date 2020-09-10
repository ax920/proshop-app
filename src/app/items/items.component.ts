import { Component, Inject, OnInit } from '@angular/core';
import { ItemsService } from './items.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../models/dialog-data';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  allItems: any[];
  displayedColumns: string[] = ['id', 'name', 'buy_price', 'sell_price', 'quantity', 'category', 'actions'];
  isDataAvailable: boolean = false;

  constructor(public itemsService: ItemsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.itemsService.getItems().subscribe(items => {
      this.allItems = items;
      this.isDataAvailable = true;
      console.log(this.allItems);
    });
  }

  openAddItemDialog(): void {
    const dialogRef = this.dialog.open(AddItemDialog, {
      width: '250px',
      data: { name: '', buy_price: '', sell_price: '', quantity: '', category: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(this.allItems[0])
      const item: DialogData = result;
      console.log("item", item);

      // Update the DB

      this.itemsService.addItem(item).subscribe(res => console.log(res));

      // Update the table
      // this.allItems.push(result);

    });
  }
}

@Component({
  selector: 'add-item-dialog',
  templateUrl: 'add-item-dialog.html',
})
export class AddItemDialog {

  constructor(
    public dialogRef: MatDialogRef<AddItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
