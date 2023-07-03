import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoginModal } from './login-modal';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';
import { faClose, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginModal?: LoginModal;
  private loginModalSubscription?: Subscription;
  userLoginForm!: FormGroup;

  faClose = faClose
  faChevronDown = faChevronDown;
  @Output() toogleLogin = new EventEmitter()

  errorUserEmail: boolean = false;
  errorUserPassword: boolean = false;
  errorUserEmailMsg: string = '';
  errorUserPasswordMsg: string = '';

  showMainLogin: boolean = false;

  constructor(private loginService: LoginService, private fb: FormBuilder, private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    this.loginModalSubscription = this.loginService.$loginModalState.subscribe((loginModal: LoginModal) => {
      this.loginModal = loginModal;
    })

    this.userLoginForm = this.fb.group({
      user_email: ['',[Validators.required, Validators.email]],
      user_password: ['',[Validators.required,Validators.minLength(8)]],
    })

  }

  public close():void{
    this.loginService.hide();
    this.toogleLogin.emit();
    this.errorUserEmail = false;
    this.errorUserPassword = false;
    this.userLoginForm.reset();
    this.showMainLogin = false;
  }

  toggleMainLogin():void{
    this.showMainLogin = !this.showMainLogin;
  }

  login():void{
    this.errorUserEmail = false;
    this.errorUserPassword = false;
    if(this.userLoginForm.invalid){
      if(this.userLoginForm.controls['user_email'].errors?.['required']){
        this.errorUserEmail = true;
        this.errorUserEmailMsg = "Please enter your email";
      }
      if(this.userLoginForm.controls['user_email'].errors?.['email']){
        this.errorUserEmail = true;
        this.errorUserEmailMsg = "Invalid email";
      }

       
      if(this.userLoginForm.controls['user_password'].errors?.['required']){
        this.errorUserPassword = true;
        this.errorUserPasswordMsg = "Please enter your password";
      }
      if(this.userLoginForm.controls['user_password'].errors?.['minlength']){
        this.errorUserPassword = true;
        this.errorUserPasswordMsg = "Invalid Password";
      }

      return;
    }

    let val = this.userLoginForm.value;
    this.authService.login(val).subscribe({
      next: (data:any)  => {
        this.authService.setAccessToken(data.accessToken);
        console.log(data);
        this.close();
        this.router.navigate(['home']);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
