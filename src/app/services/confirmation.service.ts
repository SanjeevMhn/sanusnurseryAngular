import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export type ConfirmationType = {
  message?: string,
  show?: boolean
}

let resolveCallback: any;

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  confirmationBox?: ConfirmationType;


  private show = new Subject<ConfirmationType>();
  public showBox$ = this.show.asObservable();

  constructor() { }

  initialize(data: ConfirmationType){
    this.confirmationBox = { ...data, show: true };
    this.show.next(this.confirmationBox);

    return new Promise((resolve, reject) => {
      resolveCallback = resolve;
    })
  }

  onConfirm = () => {
    this.hide();
    resolveCallback(true);
  }

  onCancel = () => {
    this.hide()
    resolveCallback(false)
  }

  hide(){
    let emptyConfirmationBox = { ...this.confirmationBox, show: false };
    this.show.next(emptyConfirmationBox);
  }
}
