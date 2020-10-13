import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../_models/dialog-data';
import { Item } from '../_models/item';
import { ItemsService } from './items.service';
import { SalesService } from '../sales/sales.service';
import { EditItemDialogComponent } from './edit-item-dialog/edit-item-dialog.component';
import { PurchaseItemDialogComponent } from './purchase-item-dialog/purchase-item-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  allItems: any[];
  displayedColumns: string[] = ['id', 'name', 'buy_price', 'sell_price', 'quantity', 'category', 'actions'];
  isDataAvailable: boolean = false;

  constructor(public itemsService: ItemsService,
    public salesService: SalesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

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
      if (result === undefined) return;
      const item: DialogData = result;
      this.itemsService.addItem(item).subscribe(res => {
        this.refresh();
      });
    });
  }

  openEditItemDialog(item: Item, id: number): void {
    const dialogRef = this.dialog.open(EditItemDialogComponent, {
      width: '250px',
      data:
      {
        name: item.name,
        buy_price: item.buy_price,
        sell_price: item.sell_price,
        quantity: item.quantity,
        category: item.category
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) return;
      const item: DialogData = result;
      this.itemsService.updateItem(id, item).subscribe(res => {
        this.refresh();
      });
    });
  }

  openPurchaseItemDialog(item: Item) {
    const dialogRef = this.dialog.open(PurchaseItemDialogComponent, {
      width: '300px',
      data:
      {
        name: item.name,
        buy_price: item.buy_price,
        sell_price: item.sell_price,
        id: item.id,
        category: item.category,
        quantity: 0,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined || +result.quantity <= 0) return;
      const qtyPurchased = +result.quantity;
      const purchasedItem = {
        id: result.id,
        name: result.name,
        buy_price: result.buy_price,
        sell_price: result.sell_price,
        category: result.category,
        quantity: qtyPurchased,
      };
      console.log(purchasedItem)
      const remainingQuantity = item.quantity - result.quantity;
      if (remainingQuantity >= 0) {
        const remainingItem: Item = { ...purchasedItem };
        remainingItem.quantity = remainingQuantity;
        this.itemsService.subtractQuantity(remainingItem).subscribe(res => {
          console.log("quyantityasdf", purchasedItem.quantity)
          this.openSnackBar(`Purchased ${purchasedItem.quantity} of "${purchasedItem.name}"`, "");
          this.salesService.purchaseItem(purchasedItem).subscribe(res => {
            console.log(res);
          })
          this.refresh();
        });
      }


    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
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