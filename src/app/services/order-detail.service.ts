import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,pipe,retry } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(private http:HttpClient) { }

  getOrderDetail(id:number):Observable<object>{
    return this.http.get(`${environment.orderUrl}/id/${id}`,{withCredentials: true}).pipe(retry(3));
  }

  getOrderItems(id:number):Observable<object>{
    return this.http.get(`${environment.orderUrl}/id/items/${id}`,{withCredentials: true}).pipe(retry(3));
  }

  getOrderPaymentDetail(id:number):Observable<object>{
    return this.http.get(`${environment.orderUrl}/id/payment_detail/${id}`, {withCredentials: true}).pipe(retry(3));
  }
}
