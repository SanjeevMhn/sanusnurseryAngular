import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interface/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent{

  constructor(private product: ProductService) { }
  page:number = 1;
  plants$ = this.product.getPlants(this.page);

}
