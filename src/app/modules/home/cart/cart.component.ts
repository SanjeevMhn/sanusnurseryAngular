import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/interface/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { faMinus, faPlus, faClose } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

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

  getItemsSubscription?: Subscription;
  deleteItemSubscription?: Subscription;
  increaseQuantitySubscription?: Subscription;
  decreaseQuantitySubscription?: Subscription;

  subTotal:number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData() {
    this.getItemsSubscription = this.cartService.getCartDetails().subscribe({
      next: (data) => {
        this.cartItems = data;
        this.calculateSubTotal();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  removeCartItem(item: CartItem) {
    this.deleteItemSubscription = this.cartService.removeCartItem(item).subscribe({
      next: (data) => {
        this.cartItems = data;
        this.calculateSubTotal()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  decreaseCartItemQuantity(item: CartItem) {
    this.decreaseQuantitySubscription = this.cartService.decreaseCartItemQuantity(item).subscribe({
      next: (data) => {
        this.cartItems = data;
        this.calculateSubTotal()
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  increaseCartItemQuantity(item: CartItem) {
    this.increaseQuantitySubscription = this.cartService.increaseCartItemQuantity(item).subscribe({
      next: (data) => {
        // console.log(data);
        this.cartItems = data;
        this.calculateSubTotal()
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  calculateSubTotal():void{
    this.subTotal = 0;
    this.cartItems.forEach((cart) => {
      this.subTotal =  this.subTotal + cart.total;
    });
  }

  ngOnDestroy() {
    this.getItemsSubscription?.unsubscribe();
    this.deleteItemSubscription?.unsubscribe();
    this.increaseQuantitySubscription?.unsubscribe();
    this.decreaseQuantitySubscription?.unsubscribe();
  }

}
