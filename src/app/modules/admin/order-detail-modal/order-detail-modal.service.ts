import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderDetailModal } from './order-detail-modal';


export type OrderDetailModalData = {
  id: number,
  title: string,
  items: {[key: string]: string}
}

@Injectable({
  providedIn: 'root'
})
export class OrderDetailModalService {

  $orderDetailModalState = new BehaviorSubject<OrderDetailModal>(new OrderDetailModal(false));
  $orderDetailModalData = new BehaviorSubject<OrderDetailModalData>({
    id: 0,
    title: '',
    items: {}
  });
  currentOrderDetailModalData = this.$orderDetailModalData.asObservable();

  constructor() { }

  public show(id: number,title: string, items: any){
    const orderDetail = new OrderDetailModal(true);
    orderDetail.title = title;
    orderDetail.items = items;

    let modalData = { id: id,title: title, items: items};
    this.$orderDetailModalData.next(modalData);
    this.$orderDetailModalState.next(orderDetail)
  }

  public close(){
    this.$orderDetailModalState.next(new OrderDetailModal(false));
    this.$orderDetailModalData.next({
      id: 0,
      title: '',
      items: {}
    });
  }
}
