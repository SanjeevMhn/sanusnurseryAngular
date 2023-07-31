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
  payment_id: number,
  payment_status: string,
  delivery_address: string|null,
  user_name: string | null,
  user_email: string | null,
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
  getAllOrdersSubscriber?: Subscription;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(){
    this.getAllOrdersSubscriber = this.http.get(`${environment.orderUrl}`,{withCredentials: true}).subscribe({
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


  ngOnDestroy(){
    this.getAllOrdersSubscriber?.unsubscribe();
  }

}
