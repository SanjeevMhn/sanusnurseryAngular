import { Component, OnInit } from '@angular/core';
import { LoginModal } from './login-modal';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginModal?: LoginModal;
  private loginModalSubscription?: Subscription;

  faClose = faClose

  constructor(private loginService: LoginService) { }
  
  ngOnInit(): void {
    this.loginModalSubscription = this.loginService.$loginModalState.subscribe((loginModal: LoginModal) => {
      this.loginModal = loginModal;
    })
  }

  public close(){
    this.loginService.hide();
  }

}
