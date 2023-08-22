import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faDatabase, faReceipt, faSpa, faTruck, faUsers } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { retry } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  faSpa = faSpa;
  faTruck = faTruck;
  faReceipt = faReceipt;
  faUsers = faUsers;
  faDatabase = faDatabase;

  totalProducts?: number;
  totalProductCategory?: number;
  totalOrders?: number;

  repeatedProducts?: any[];
  orderDeliveryPaymentStatus?: any[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getTotalProducts();
    this.getTotalProductCategories();
    this.getTotalOrders();
    this.getRepeatedProducts();
    this.getOrderDeliveryPaymentStatus();
  }

  getTotalProducts(){
    this.http.get(`${environment.baseUrl}/count`,{withCredentials: true}).subscribe({
      next:(data:any) => {
        this.totalProducts = Number(data.count);
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

  getTotalProductCategories(){
    this.http.get(`${environment.baseUrl}/categories/count`,{withCredentials: true}).subscribe({
      next: (data:any) => {
        this.totalProductCategory = Number(data.count);
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

  getTotalOrders(){
    this.http.get(`${environment.orderUrl}/count`,{withCredentials: true}).subscribe({
      next: (data: any) => {
        this.totalOrders = Number(data.count);
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

  getRepeatedProducts(){
    this.http.get(`${environment.orderUrl}/repeatedProducts`,{withCredentials:true}).subscribe({
      next: (data: any) => {
        this.repeatedProducts = data.products;
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

  getOrderDeliveryPaymentStatus(){
    this.http.get(`${environment.orderUrl}/orderDeliveryPaymentStatus`,{withCredentials: true}).pipe(retry(3)).subscribe({
      next: (data: any) => {
        this.orderDeliveryPaymentStatus = data.orders;
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

}
