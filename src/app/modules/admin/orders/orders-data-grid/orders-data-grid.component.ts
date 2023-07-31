import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-data-grid',
  templateUrl: './orders-data-grid.component.html',
  styleUrls: ['./orders-data-grid.component.scss']
})
export class OrdersDataGridComponent implements OnInit {

  @Input() orderList?: any[];
  @Input() currentPage?: number;
  @Input() totalPages?: number;
  @Input() totalItems?: number;
  constructor() { }

  ngOnInit(): void {
  }

}
