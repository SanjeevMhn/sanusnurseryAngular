import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderDetailService } from 'src/app/services/order-detail.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {


  editOrderForm!: FormGroup;
  order?:any;
  paymentDetail?:any;
  orderItems?: any[];

  constructor(
    private fb: FormBuilder, 
    private route:ActivatedRoute,
    private orderDetailService: OrderDetailService) { }

  ngOnInit(): void {
    this.editOrderForm = this.fb.group({
      order_num :['',[Validators.required]],
      order_status :['',[Validators.required]],
      order_date: ['',[Validators.required]],
      payment_date: [''],
      payment_type: ['',[Validators.required]],
      payment_status: ['',[Validators.required]],
      payment_total: ['',[Validators.required]],
      user_name: ['',[Validators.required]],
      user_email: ['',[Validators.required]],
      user_type: ['',[Validators.required]],
      user_contact: ['',[Validators.required]],
      user_address: ['',[Validators.required]]
    })

    this.editOrderForm.controls['order_num'].disable();

    const orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.updateForm(orderId);
  }

  updateForm(orderId:number){
    this.getOrderDetail(orderId);
    this.getOrderItems(orderId);
    this.getOrderPaymentDetail(orderId);

  }

  getOrderDetail(id:number){
    this.orderDetailService.getOrderDetail(id).subscribe({
      next: (data: any) => {
        this.order = data.order;
        this.fillform();
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
        this.fillform();
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
        this.fillform();
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

  fillform(){
    this.editOrderForm.patchValue({
      order_num: this.order?.order_number,
      order_status: this.order?.order_status,
      order_date: this.order?.order_date,
      payment_date: this.paymentDetail?.payment_date,
      payment_type: this.order?.payment_type,
      payment_status: this.paymentDetail?.payment_status,
      payment_total: this.paymentDetail?.total_amount,
      user_name: this.order?.user_name,
      user_email: this.order?.user_email,
      user_type: this.order?.user_id === null ? 'Guest' : 'Registered',
      user_contact: this.order?.user_contact,
      user_address: this.order?.delivery_address
    })
  }

}
