import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productsList?:Product[];
  page:number = 1;
  productsSubscription?:Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productsSubscription = this.productService.getAllPlants(this.page).subscribe({
      next: (data:any) => {
        this.productsList = data.products;
      },
      error: (err: any) => {
        console.error(err);
      }
    })

  }

  ngOnDestroy(){
    this.productsSubscription?.unsubscribe();
  }

}
