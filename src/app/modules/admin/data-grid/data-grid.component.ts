import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/interface/product';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit {

  @Input() productsList?:Product[];

  constructor() { }

  ngOnInit(): void {
  }

}
