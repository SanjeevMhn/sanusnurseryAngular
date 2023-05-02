import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastModal, ToastType } from '../modules/shared/toast/toast.modal';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  $toastState = new BehaviorSubject<ToastModal>(new ToastModal(false));

  public show(message:string,type: ToastType){
    let toast = new ToastModal(true);
    toast.message = message;
    toast.type = type;

    this.$toastState.next(toast);
    
    setTimeout(()=>this.$toastState.next(new ToastModal(false)),3000)
  }

}
