import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { faBars, faBell,faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from '../../shared/toast/toast.modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
}) 
export class HeaderComponent implements OnInit {

  userData?:any;

  @Output() toggleAdminSidenavEvent = new EventEmitter();

  constructor( private authService: AuthService, private toastService: ToastService, private router: Router ) { }

  faBell = faBell;
  faChevronDown = faChevronDown;
  faBars = faBars;
  faXmark = faXmark;

  showDropDown: boolean = false;

  ngOnInit(): void {
    this.authService.userData.subscribe({
      next: (data: any) => {
        this.userData = data;
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

  toggleDropDown(){
    this.showDropDown = !this.showDropDown;
  }

  toggleAdminSidenav(){
    this.toggleAdminSidenavEvent.emit(true);
  }

  logout(){
    this.authService.logout().subscribe({
      next: (data: any) => {
        AuthInterceptor.accessToken = '';
        this.authService.removeUserData();
        this.toastService.show('User logged out', ToastType.success);
        this.userData = {};
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        console.error(err);
      }
    });
    
  }

}
