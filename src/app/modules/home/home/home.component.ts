import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interface/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private product: ProductService) { }
  plants?: Product[];
  page:number = 1;

  ngOnInit(): void {
    this.product.getPlants(this.page).subscribe({
      next: (data:any) => {
        this.plants = data.products;
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

}
