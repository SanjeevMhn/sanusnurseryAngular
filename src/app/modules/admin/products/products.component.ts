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

  productsList?: Product[];
  page: number = 1;
  pageSize: number = 6;
  totalPages?: number;
  totalProducts?: number;


  productsSubscription?: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

    this.getProducts();

  }

  getProducts() {
    this.productsSubscription = this.productService.getAllPlants(this.page, this.pageSize).subscribe({
      next: (data: any) => {
        this.productsList = data.products;
        this.totalPages = data.totalPages;
        this.totalProducts = data.totalItems;
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }


  nextPage(event: number) {
    this.page = event;
    this.getProducts();
  }

  prevPage(event: number) {
    this.page = event;
    this.getProducts();
  }

  changePageSize(event: number) {
    this.pageSize = event;
    this.getProducts();
  }

  firstPage(event: number) {
    this.page = event;
    this.getProducts();
  }

  lastPage(event: number) {
    this.page = event;
    this.getProducts();
  }

  ngOnDestroy() {
    this.productsSubscription?.unsubscribe();
  }

}
