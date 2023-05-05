import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CartItem } from 'src/app/interface/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { faMinus, faPlus, faClose } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from '../../shared/toast/toast.modal';
import { Router } from '@angular/router';
import { OrderDetail } from 'src/app/interface/order-detail';
import { v4 as uuid } from 'uuid';

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
  setQuantitySubscription?: Subscription;

  subTotal: number = 0;

  checkoutForm!: FormGroup;
  formMessage?: string;
  nameField: any;
  phoneField: any;
  addressField: any;

  @ViewChild('productQuantityInput', { static: false }) productQunatityInput?:ElementRef; 

  constructor(private cartService: CartService,
    private fb: FormBuilder,
    private http: HttpClient,
    private toastService: ToastService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCartData();
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email,]],
      address: ['', [Validators.required, Validators.maxLength(255)]]
    })

    this.nameField = this.checkoutForm.get('name');
    this.phoneField = this.checkoutForm.get('phone');
    this.addressField = this.checkoutForm.get('address');
  }

  // ngAfterViewInit():void{
  //   this.productQunatityInput?.nativeElement.focus();
  // }

  getFieldClass(controlName: any) {
    const control = this.checkoutForm.get(controlName)!;
    return {
      'is-invalid': control.invalid && control.touched
    };
  }

  markInvalidField(form: FormGroup) {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
    })
  }

  checkout() {
    if (this.checkoutForm.invalid) {
      this.formMessage = "Please fill the required fields";
      this.markInvalidField(this.checkoutForm)
      this.toastService.show('Error while entering form details', ToastType.error)
      return;
    }else {
      let val = this.checkoutForm.value;
      // this.formMessage = '';
      // (val.name && val.phone && val.address && val.email)
      this.formMessage = '';
      let date = new Date();
      let formattedDate = date.toLocaleString('en-US', {
        weekday: 'short',
        day: 'numeric',
        year: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      });

      let orderDetail:OrderDetail = {
        id: uuid(), 
        date: String(formattedDate),
        name: val.name,
        phone: val.phone,
        address: val.address,
        email: val.email,
        products: JSON.stringify(this.cartItems),
        total: this.subTotal,
      };

      let headers = new Headers({
        'Content-Type': 'application/json'
      })

      // let url = 'https://script.google.com/macros/s/AKfycbyUmLlDk9Bum4Q3jTgeIOZBQIO6pfuiEIUeLpWWvjvwffHBsgHqrjld99SHZndrGyU/exec';
      let url = 'https://script.google.com/macros/s/AKfycbzRxAGvcmdWWEKyRU6TUjDH7J5PEauChh1BpFECT9G_7_VDxVkIzYY2Z4jDDRaTwZPb/exec'; 

      fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: headers,
        body: JSON.stringify(orderDetail)
      })
        .then(res => {
          return res.text()
        })
        .then(data => {
          // data ? JSON.parse(data) : {};
          // console.log(data)
          this.clearCart();
          this.toastService.show('Order Sent Successfully', ToastType.success);
          this.router.navigate(['/home/checkout/', { previousRoute: '/home/cart' }]);
        })
        .catch(error => console.error(error));

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

  clearCart() {
    this.cartItems = [];
    this.checkoutForm.reset();
    this.cartService.clearCart();
  }

  setProductQuantity(event: any, item: CartItem) {
    let quantity: number = event.target.value;
    if (quantity > 0 && quantity) {
      this.setQuantitySubscription = this.cartService.setCartItemQuantity(item, quantity).subscribe({
        next: (data) => {
          this.cartItems = data;
          this.calculateSubTotal();
        },
        error: (err) => {
          console.error(err);
        }
      })
    } else {
      this.toastService.show("Please add quantity for the product", ToastType.error);
      this.setQuantitySubscription = this.cartService.setCartItemQuantity(item, quantity = 0).subscribe({
        next: (data) => {
          this.cartItems = data;
          this.calculateSubTotal();
        },
        error: (err) => {
          console.error(err);
        }
      })
    }
    // console.log(this.productQuantity);
  }

  ngOnDestroy() {
    this.getItemsSubscription?.unsubscribe();
    this.deleteItemSubscription?.unsubscribe();
    this.increaseQuantitySubscription?.unsubscribe();
    this.decreaseQuantitySubscription?.unsubscribe();
    this.setQuantitySubscription?.unsubscribe();
  }

}
