import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { faEllipsis, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-orders-data-grid-row',
  templateUrl: './orders-data-grid-row.component.html',
  styleUrls: ['./orders-data-grid-row.component.scss']
})
export class OrdersDataGridRowComponent implements OnInit {

  @Input() i?:number;
  @Input() item?:any;

  faCashWave = faMoneyBillWave
  faEllipsis = faEllipsis

  showDropdown: boolean = false;

  constructor(private http:HttpClient) { }

  ngOnInit(): void { }

  toggleDropdown(){
    this.showDropdown = !this.showDropdown;
  }
}
