import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './sales.component';



@NgModule({
  declarations: [SalesComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SalesComponent
  ]
})
export class SalesModule { }
