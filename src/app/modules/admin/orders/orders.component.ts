import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';


type Order = {
  order_id: number,
  order_number: string,
  user_id: number | null,
  order_date: string,
  order_total: number,
  order_status: string,
  payment_type: number,
  payment_status: string,
  delivery_address: string|null,
  user_email: string | null,
  user_contact: string | null,
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  orders?: Order[];
  pageSize: number = 10;
  getAllOrdersSubscriber?: Subscription;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(){
    this.getAllOrdersSubscriber = this.http.get(`${environment.orderUrl}?page=${this.currentPage}&pageSize=${this.pageSize}`,{withCredentials: true}).subscribe({
      next: (data: any) => {
        this.currentPage = data.currentPage;
        this.totalItems = data.totalItems;
        this.totalPages = data.totalPages;
        this.orders = data.orders;
      },
      error: (err: any) => {
        console.error(err)
      }
    })
  }

  nextPage(event: number) {
    this.currentPage = event;
    console.log(this.currentPage)
    this.getAllOrders();
  }

  prevPage(event: number) {
    this.currentPage = event;
    this.getAllOrders();
  }

  changePageSize(event: number) {
    this.pageSize = event;
    this.getAllOrders();
  }

  firstPage(event: number) {
    this.currentPage = event;
    this.getAllOrders();
  }

  lastPage(event: number) {
    this.currentPage = event;
    this.getAllOrders();
  }

  ngOnDestroy(){
    this.getAllOrdersSubscriber?.unsubscribe();
  }

}
