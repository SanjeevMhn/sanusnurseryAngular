import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, retry, Subject, debounceTime, distinctUntilChanged } from 'rxjs';
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

  // private userNameSubject = new Subject<string>();

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getAllOrders();
    // this.userNameSubject.pipe(
    //   debounceTime(1000),
    //   distinctUntilChanged()
    //   ).subscribe((userName:string) => {
    //     this.http.get(`${environment.orderUrl}/search/user_name?name=${userName}`,{ withCredentials: true }).subscribe({
    //       next: (data: any) => {
    //         this.orders = data.orders
    //       },
    //       error: (err: any) => {
    //         console.error(err);
    //       }
    //     })
    //   })
  }

  getAllOrders(){
    this.getAllOrdersSubscriber = this.http.get(`${environment.orderUrl}?page=${this.currentPage}&pageSize=${this.pageSize}`,{withCredentials: true}).pipe(
      retry(3)
    ).subscribe({
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

  searchByDate(event: string){
    if(event == '' || event == null){
      this.getAllOrders();
      return;
    }
    this.http.get(`${environment.orderUrl}/search/date/${event}`,{ withCredentials: true }).subscribe({
      next: (data: any) => {
        this.orders = data.orders; 
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

  searchByUserName(event: string){
    if(event == '' || event == null || !event){
      this.getAllOrders();
      return;
    }
    this.http.get(`${environment.orderUrl}/search/user_name?name=${event}`,{withCredentials: true}).subscribe({
      next: (data: any) => {
        this.orders = data.orders;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  ngOnDestroy(){
    this.getAllOrdersSubscriber?.unsubscribe();
  }

}
