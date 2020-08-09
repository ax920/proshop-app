import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DashboardModule } from './dashboard/dashboard.module';
import { ItemsModule } from './items/items.module';
import { InventoryModule } from './inventory/inventory.module';
import { SalesModule } from './sales/sales.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    DashboardModule,
    ItemsModule,
    InventoryModule,
    SalesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
