import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfirmModal } from './confirm-modal';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  $confirmState = new BehaviorSubject<ConfirmModal>(new ConfirmModal(false));
  $confirmSubject = new BehaviorSubject<Boolean>(false);

  constructor() { }

  public show(message: string){
    let confirm = new ConfirmModal(true);
    confirm.message = message;
    this.$confirmState.next(confirm);
  }

  public confirm(): Observable<Boolean>{
    this.$confirmSubject.next(true)
    return this.$confirmSubject as Observable<Boolean>;
  }
  
  public cancel(): Boolean{
    return false;
  }

  public hide(){
    this.$confirmState.next(new ConfirmModal(false));
  }
}
