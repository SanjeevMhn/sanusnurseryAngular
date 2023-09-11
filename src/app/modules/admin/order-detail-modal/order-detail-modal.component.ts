import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
import { ToastType } from '../../shared/toast/toast.modal';
import { OrderDetailModal } from './order-detail-modal';
import { OrderDetailModalService } from './order-detail-modal.service';
import { OrderDetailModalData } from './order-detail-modal.service';

@Component({
  selector: 'app-order-detail-modal',
  templateUrl: './order-detail-modal.component.html',
  styleUrls: ['./order-detail-modal.component.scss']
})
export class OrderDetailModalComponent implements OnInit {


  public orderDetailModal!: OrderDetailModal;

  faClose = faClose;

  orderForm!: FormGroup;
  paymentDetailForm!: FormGroup;
  userDetailForm!: FormGroup;
  orderItemsForm!: FormGroup;

  activeForm?: OrderDetailModalData;
  orderId?:number;

  constructor(
    private orderDetailModalService: OrderDetailModalService,
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private router: Router    
    ) { }

  ngOnInit(): void {
    this.orderDetailModalService.$orderDetailModalState.subscribe((orderDetailModal: OrderDetailModal) => {
      this.orderDetailModal = orderDetailModal;
    })

    this.orderForm = this.fb.group({
      order_number: ['',[Validators.required]],
      order_status: ['',[Validators.required]],
      order_date: ['',[Validators.required]]
    });

    this.orderForm.controls['order_number'].disable();

    this.paymentDetailForm = this.fb.group({
      payment_date: [''],
      total_amount: ['',[Validators.required]],
      payment_type: ['',[Validators.required]],
      payment_status: ['',[Validators.required]]
    });

    this.userDetailForm = this.fb.group({
      user_name: ['',[Validators.required]],
      user_email: ['',[Validators.required]],
      user_type: ['',[Validators.required]],
      user_contact: ['',[Validators.required]],
      user_address: ['',[Validators.required]],
    });

    this.orderDetailModalService.currentOrderDetailModalData.subscribe((data: OrderDetailModalData) => {
      
        if(data.id){
          this.activeForm = data;
          switch(this.activeForm!.title){
            case "order":
              this.fillForm(this.orderForm, this.activeForm!.items);
              break;

            case "payment detail":
              this.fillForm(this.paymentDetailForm, this.activeForm!.items);
              break;

            case "user detail":
              this.fillForm(this.userDetailForm, this.activeForm!.items);
              break;
          }
        }
      
    })

  }

  fillForm(formGroup: FormGroup, items: {[key: string]: string}){
    
    Object.keys(items).forEach(key => {
      const control = formGroup.get(key);

      if(control){
        control.patchValue(items[key]);
      }
    })
    
  }

  updateOrderForm(){
    this.http.patch(`${environment.orderUrl}/id/${this.activeForm?.id}`,this.orderForm.value,{withCredentials: true}).subscribe({
      next: (data: any) => {
        this.toastService.show(data.message,ToastType.success);
        this.close();
        this.router.navigate(['/admin/order-detail/',this.activeForm?.id]);
      },
      error: (err: any) => {
        console.error(err)
      }
    })
  }

  updatePaymentDetailForm(){
    this.http.patch(`${environment.orderUrl}/id/payment_detail/${this.activeForm?.id}`,this.paymentDetailForm.value, {withCredentials: true}).subscribe({
      next: (data: any) => {
        this.toastService.show(data.message,ToastType.success);
        this.close();
        this.router.navigate(['/admin/order-detail/',this.activeForm?.id]);
      },
      error: (err: any) => {
        console.error(err)
      }
    })

  }

  updateUserDetailForm(){

  }


  close(): void{
    this.orderDetailModalService.close()
  }

}
