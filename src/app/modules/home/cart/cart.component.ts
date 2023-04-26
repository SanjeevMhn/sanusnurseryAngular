import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/interface/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { faMinus, faPlus, faClose } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
      const formData = new FormData();
      formData.append('date', date.toISOString())
      formData.append('name', val.name);
      formData.append('phone', val.phone);
      formData.append('email', val.email);
      formData.append('products', this.cartItems.toString());
      formData.append('address', val.address);

      console.log(formData);
      let headers = new HttpHeaders({'Content-Type': 'application/json'})
      this.http.post('https://script.google.com/macros/s/AKfycbzAok4kHZD9ZLwfK9lH4Xups1bcldikEmhGjlJdOEhSmH0zCWTL3DTJJznLNQG9lXLQ/exec', formData, {headers}).subscribe({
        next: (res) => {
          console.log('successful');
        },
        error: (error) => {
          console.error(error);
        }
      })
      // fetch('https://script.google.com/macros/s/AKfycbwY4CWB9TDZ7P4YV0yivpbsYwKA7mlexuEggXbCPcncECrsPRqokjWYe0WfY9cer0nq/exec',{
      //   method: "POST",
      //   body: formData
      // })
      // .then((res) => res.json())
      // .then((data) => console.log(data))
      // .catch(error => {
      //   console.error(error)
      // });

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

  ngOnDestroy() {
    this.getItemsSubscription?.unsubscribe();
    this.deleteItemSubscription?.unsubscribe();
    this.increaseQuantitySubscription?.unsubscribe();
    this.decreaseQuantitySubscription?.unsubscribe();
  }

}
