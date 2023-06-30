import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginModal } from '../modules/home/login/login-modal';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  $loginModalState = new BehaviorSubject<LoginModal>(new LoginModal(false));

  constructor() { }

  public show(message:string){
    let loginModal = new LoginModal(true) ;
    loginModal.message = message;

    this.$loginModalState.next(loginModal);
  }

  public hide(){
    this.$loginModalState.next(new LoginModal(false));
  }
}
