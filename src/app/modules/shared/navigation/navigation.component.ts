import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faSearch, faPhone, faCartShopping, faBars, faUser, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/interface/product';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

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
  cartList: Product[] = [];
  public userData?: any;

  showDropDown: boolean = false;

  @Output() toggleSideNav = new EventEmitter();
  @Output() toggleSearch = new EventEmitter();
  @Output() toggleLogin = new EventEmitter();

  constructor(
    private cart: CartService,
    private loginModalService: LoginService,
    private http: HttpClient,
    private router: Router
  ) {

    this.http.get(`${environment.authUrl}/me`).subscribe({
      next: (res: any) => {
        this.userData = res.user[0];
        console.log(this.userData);
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

  ngOnInit(): void {
    this.getCartData();
    this.http.get(`${environment.authUrl}/me`).subscribe({
      next: (res: any) => {
        this.userData = res.user[0];
        console.log(this.userData);
      },
      error: (err: any) => {
        console.error(err);
      }
    })
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
    this.http.post(`${environment.authUrl}/logout`, {}, { withCredentials: true }).subscribe({
      next: (data: any) => {
        this.userData = null;
      }
    })
  }

}
