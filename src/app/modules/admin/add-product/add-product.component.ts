import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  prodCategories?: any[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getPlantCategories().subscribe({
      next:(data:any) => {
        this.prodCategories = data.categories;
      },
      error: (err: any) => {
        console.error(err)
      }
    })
  }

}
