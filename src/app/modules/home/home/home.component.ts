import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private product: ProductService) { }
  plants?: any[];
  limit:number = 8;

  ngOnInit(): void {
    this.product.getPlants(this.limit).subscribe({
      next: (data) => {
        this.plants = data
        console.log(this.plants)
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

}
