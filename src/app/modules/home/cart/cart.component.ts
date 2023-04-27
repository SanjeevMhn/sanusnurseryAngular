import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/interface/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { faMinus, faPlus, faClose } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

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

  subTotal: number = 0;

  checkoutForm!: FormGroup;
  formMessage?: string;

  constructor(private cartService: CartService, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.getCartData();
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(255)]]
    })
  }

  checkout() {
    let val = this.checkoutForm.value;
    this.formMessage = '';
    if (val.name && val.phone && val.address) {
      this.formMessage = '';
      let date = new Date();
      let addDate = {
        date: String(date),
        ...val,
        products: JSON.stringify(this.cartItems),
        total: this.subTotal,
      };

      let headers = new Headers({
        'Content-Type': 'application/json'
      })

      let url = 'https://script.google.com/macros/s/AKfycbwPfOZOE4TwBHqkremj4Ct1-hoh7GzuBcU90UnpPhfU47e3L_yTfWYxRzpNrgsMrv5x/exec'

      fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: headers,
        body: JSON.stringify(addDate)
      })
        .then(res => {
          return res.text()
        })
        .then(data => {
          // data ? JSON.parse(data) : {};
          console.log(data)
          this.clearCart();
        })
        .catch(error => console.error(error));

    } else {
      this.formMessage = "Please fill the required fields"
    }
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

  calculateSubTotal(): void {
    this.subTotal = 0;
    this.cartItems.forEach((cart) => {
      this.subTotal = this.subTotal + cart.total;
    });
  }

  clearCart(){
    this.cartItems = [];
    this.checkoutForm.reset();
    this.cartService.clearCart();
  }


  ngOnDestroy() {
    this.getItemsSubscription?.unsubscribe();
    this.deleteItemSubscription?.unsubscribe();
    this.increaseQuantitySubscription?.unsubscribe();
    this.decreaseQuantitySubscription?.unsubscribe();
  }

}
