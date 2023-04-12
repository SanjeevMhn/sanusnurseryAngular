import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
})
export class ProductdetailComponent implements OnInit {

  productId?: number;
  productDetail?: Product;
  constructor(private route: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProduct(this.productId);
  }

  getProduct(id: number) {
    this.product.getPlantFromId(id).subscribe({
      next: (data) => {
        console.log(data);
        this.productDetail = data[0]
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

}
