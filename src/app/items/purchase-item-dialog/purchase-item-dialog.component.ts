import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogData } from '../../models/dialog-data';

@Component({
  selector: 'app-purchase-item-dialog',
  templateUrl: './purchase-item-dialog.component.html',
  styleUrls: ['./purchase-item-dialog.component.css']
})
export class PurchaseItemDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PurchaseItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
