import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoginModal } from './login-modal';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';
import { faClose, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from '../../shared/toast/toast.modal';

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
  @Output() toggleLogin = new EventEmitter()

  errorUserEmail: boolean = false;
  errorUserPassword: boolean = false;
  errorUserEmailMsg: string = '';
  errorUserPasswordMsg: string = '';

  errFormMessage: string = '';

  showMainLogin: boolean = false;

  constructor(
    private loginService: LoginService, 
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private toastService: ToastService
    ) { }
  
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
    this.toggleLogin.emit();
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
    this.http.post(environment.authUrl,val,{withCredentials: true}).subscribe({
      next: (res: any) =>{
        this.close();
        AuthInterceptor.accessToken = res.accessToken;
        this.router.navigate(['/home']);
        this.toastService.show('User logged in', ToastType.success);
      },
      error: (err: any) => {
        console.error(err);
        this.errFormMessage = err.message;
        console.log(err.message);
      }
    })  
  }

}
