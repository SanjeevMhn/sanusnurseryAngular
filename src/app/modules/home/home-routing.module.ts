import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';

const routes: Routes = [
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'product/:id', component: ProductdetailComponent },
      { path: 'products/:type', component: ProductsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
