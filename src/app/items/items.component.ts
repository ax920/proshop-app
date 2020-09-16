import { Component, Inject, OnInit } from '@angular/core';
import { ItemsService } from './items.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../models/dialog-data';
import { Item } from '../models/item';
import { EditItemDialogComponent } from './edit-item-dialog/edit-item-dialog.component';

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
      this.allItems = items.sort(function (a, b) {
        return a.id - b.id || a.name.localeCompare(b.name);
      });
      this.isDataAvailable = true;
    });
  }

  ngAfterViewInit() {

  }

  refresh() {
    this.itemsService.getItems().subscribe(items => {
      this.allItems = items.sort(function (a, b) {
        return a.id - b.id || a.name.localeCompare(b.name);
      });;
      this.isDataAvailable = true;
    });
  }

  openAddItemDialog(): void {
    const dialogRef = this.dialog.open(AddItemDialog, {
      width: '250px',
      data: { name: '', buy_price: '', sell_price: '', quantity: '', category: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      const item: DialogData = result;
      this.itemsService.addItem(item).subscribe(res => {
        this.refresh();
      });
    });
  }

  openEditItemDialog(id: number): void {
    this.itemsService.getItemById(id).subscribe(res => {
      const currentItemInfo: Item = res;
      const dialogRef = this.dialog.open(EditItemDialogComponent, {
        width: '250px',
        data:
        {
          name: currentItemInfo.name,
          buy_price: currentItemInfo.buy_price,
          sell_price: currentItemInfo.sell_price,
          quantity: currentItemInfo.quantity,
          category: currentItemInfo.category
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        const item: DialogData = result;
        this.itemsService.updateItem(id, item).subscribe(res => {
          this.refresh();
        });
      });
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