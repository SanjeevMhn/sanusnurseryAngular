import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faSearch, faPhone, faCartShopping, faBars, faUser, faCircleUser, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/interface/product';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { isObjectEmpty } from 'src/app/utils/functions/isObjectEmpty';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from '../toast/toast.modal';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { catchError, ignoreElements, of } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  faSearch = faSearch;
  faPhone = faPhone;
  faCartShopping = faCartShopping;
  faBars = faBars;
  faUser = faUser;
  faCircleUser = faCircleUser
  faChevronDown = faChevronDown

  cartList: Product[] = [];
  userData$ = this.authService.getUserData();

  showDropDown: boolean = false;

  @Output() toggleSideNav = new EventEmitter();
  @Output() toggleSearch = new EventEmitter();
  @Output() toggleLogin = new EventEmitter();

  constructor(
    private cart: CartService,
    private loginModalService: LoginService,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {

    // this.authService.userData.subscribe({
    //   next: (data: any) => {
    //     this.userData = data;
    //   },
    //   error: (err: any) => {
    //     console.error(err);
    //   }
    // })

  }

  ngOnInit(): void {
    this.getCartData();
  }

  checkObject(obj: Object): boolean {
    return isObjectEmpty(obj);
  }

  onToggleSideNav() {
    this.toggleSideNav.emit()
  }

  onToggleSearch() {
    this.toggleSearch.emit()
  }

  getCartData(): void {
    this.cart.getCartDetails().subscribe({
      next: (data) => {
        this.cartList = data
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  onOpenLoginModal() {
    this.loginModalService.show('Login');
    this.toggleLogin.emit();
  }

  toggleDropDown() {
    this.showDropDown = !this.showDropDown;
  }

  logout() {

    this.authService.logout().subscribe({
      next: (data: any) => {
        AuthInterceptor.accessToken = '';
        // this.authService.removeUserData();
        this.toastService.show('User logged out', ToastType.success);
        // this.userData = {};
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

}
