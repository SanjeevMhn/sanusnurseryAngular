import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataGridComponent } from './products/data-grid/data-grid.component';
import { DataGridRowComponent } from './products/data-grid-row/data-grid-row.component';
import { OrdersDataGridComponent } from './orders/orders-data-grid/orders-data-grid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product/add-product.component';
import { SharedModule } from '../shared/shared.module';
import { OrdersDataGridRowComponent } from './orders/orders-data-grid-row/orders-data-grid-row.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { AdminNavItemComponent } from './layout/admin-nav-item/admin-nav-item.component';


@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent,
    ProductsComponent,
    OrdersComponent,
    HeaderComponent,
    DataGridComponent,
    DataGridRowComponent,
    AddProductComponent,
    OrdersDataGridComponent,
    OrdersDataGridRowComponent,
    OrderDetailComponent,
    AdminNavItemComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminModule { }
