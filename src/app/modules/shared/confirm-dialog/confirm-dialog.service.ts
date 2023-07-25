import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfirmModal } from './confirm-modal';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  $confirmState = new BehaviorSubject<ConfirmModal>(new ConfirmModal(false));
  $confirmSubject = new BehaviorSubject<Boolean>(false);

  confirmValue = this.$confirmSubject.getValue();

  constructor() { }

  public show(message: string){
    let confirm = new ConfirmModal(true);
    confirm.message = message;
    this.$confirmState.next(confirm);
  }

  public hide(){
    this.$confirmState.next(new ConfirmModal(false));
  }

  public confirm(){
    this.$confirmSubject.next(true);
  }

  public cancel(){
    this.$confirmSubject.next(false);
  }
}
