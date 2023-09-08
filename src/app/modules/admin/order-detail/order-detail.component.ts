import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { faMoneyBillWave, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { retry } from 'rxjs';
import { OrderDetailService } from 'src/app/services/order-detail.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  order?: any;
  orderItems?: any[];
  paymentDetail?:any;

  faCashWave = faMoneyBillWave;
  faPenToSquare = faPenToSquare;
  constructor(
    private route: ActivatedRoute, 
    private http:HttpClient,
    private orderDetailService: OrderDetailService) { }

  ngOnInit(): void {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.getOrderDetail(orderId);
    this.getOrderItems(orderId);
    this.getOrderPaymentDetail(orderId);
  }

  getOrderDetail(id:number){
    this.orderDetailService.getOrderDetail(id).subscribe({
      next: (data: any) => {
        this.order = data.order;
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

  getOrderItems(id:number){
    this.orderDetailService.getOrderItems(id).subscribe({
      next: (data: any) => {
        this.orderItems = data.items;
      },
      error: (err:any) => {
        console.error(err);
      }
    })
  }

  getOrderPaymentDetail(id:number){
    this.orderDetailService.getOrderPaymentDetail(id).subscribe({
      next: (data: any) => {
        this.paymentDetail = data.payment_detail[0];
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

}
