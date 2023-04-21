import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/interface/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { faMinus, faPlus, faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];

  faMinus = faMinus;
  faPlus = faPlus;
  faClose = faClose;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData() {
    this.cartService.getCartDetails().subscribe({
      next: (data) => {
        this.cartItems = data;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  removeCartItem(item: CartItem) {
    this.cartService.removeCartItem(item).subscribe({
      next: (data) => {
        this.cartItems = data;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  decreaseCartItemQuantity(item: CartItem) {

  }

  increaseCartItemQuantity(item: CartItem) {

  }

}
