import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faSearch, faPhone, faCartShopping, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/interface/product';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';

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
  cartList: Product[] = [];

  @Output() toggleSideNav = new EventEmitter();
  @Output() toggleSearch = new EventEmitter();

  constructor(private cart: CartService, private loginModalService: LoginService) { }

  ngOnInit(): void {
    this.getCartData();
  }

  onToggleSideNav(){
    this.toggleSideNav.emit()
  }

  onToggleSearch(){
    this.toggleSearch.emit()
  }

  getCartData():void{
    this.cart.getCartDetails().subscribe({
      next: (data) => {
        this.cartList = data
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  openLoginModal(){
    this.loginModalService.show('Login');
  }

}
