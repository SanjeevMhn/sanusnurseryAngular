import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { AddProductComponent } from './add-product/add-product.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddOrderComponent } from './add-order/add-order.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'add-product/:id', component: AddProductComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'order-detail/:id', component: OrderDetailComponent },
      { path: 'product-categories', component: CategoriesComponent },
      { path: 'add-order/:id', component: AddOrderComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
