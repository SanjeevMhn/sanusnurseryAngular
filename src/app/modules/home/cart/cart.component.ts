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
import { convertToPdf } from 'src/app/utils/functions/convertToPdf';

interface PaymentBill {
  date: string | undefined,
  name: string,
  phone: number,
  address: string,
  products: CartItem[],
  subTotal: number
};

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

  errorFtName: boolean = false;
  errorLtName: boolean = false;
  errorPhone: boolean = false;
  errorEmail: boolean = false;
  errorAddress: boolean = false;

  errorFtNameMsg: string = '';
  errorLtNameMsg: string = '';
  errorPhoneMsg: string = '';
  errorEmailMsg: string = '';
  errorAddressMsg: string = '';

  billDate?: string;
  paymentReceipt?: PaymentBill;
  showBill: boolean = false


  @ViewChild('productQuantityInput', { static: false }) productQunatityInput?: ElementRef;

  constructor(private cartService: CartService,
    private fb: FormBuilder,
    private http: HttpClient,
    private toastService: ToastService,
    private router: Router) { }

  ngOnInit(): void {
    let date = new Date();
    this.billDate = `${(1 + date.getMonth()).toString()}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`
    this.getCartData();
    this.checkoutForm = this.fb.group({
      ftname: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3), Validators.pattern(/[\S]/g)]],
      ltname: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3), Validators.pattern(/[\S]/g)]],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email,]],
      address: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(10)]]
    })
  }

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
    this.errorFtName = false;
    this.errorLtName = false;
    this.errorPhone = false;
    this.errorEmail = false;
    this.errorAddress = false;

    if (this.checkoutForm.invalid) {

      //user name validation
      if (this.checkoutForm.controls['ftname'].errors?.['required']) {
        this.errorFtName = true;
        this.errorFtNameMsg = "Please enter your name";
      }
      if (this.checkoutForm.controls['ftname'].errors?.['minlength']) {
        this.errorFtName = true
        this.errorFtNameMsg = "Invalid name, name should be atleast 3 characters";
      }
      if (this.checkoutForm.controls['ftname'].errors?.['maxlength']) {
        this.errorFtName = true
        this.errorFtNameMsg = "Invalid name, name should be not more than 50 characters";
      }
      if (this.checkoutForm.controls['ftname'].errors?.['pattern']) {
        this.errorFtName = true
        this.errorFtNameMsg = "Invalid name, name cannot be only whitespaces";
      }

      if (this.checkoutForm.controls['ltname'].errors?.['required']) {
        this.errorLtName = true;
        this.errorLtNameMsg = "Please enter your last name";
      }
      if (this.checkoutForm.controls['ltname'].errors?.['minlength']) {
        this.errorLtName = true
        this.errorLtNameMsg = "Invalid name, name should be atleast 3 characters";
      }
      if (this.checkoutForm.controls['ltname'].errors?.['maxlength']) {
        this.errorLtName = true
        this.errorLtNameMsg = "Invalid name, name should be not more than 50 characters";
      }
      if (this.checkoutForm.controls['ltname'].errors?.['pattern']) {
        this.errorLtName = true
        this.errorLtNameMsg = "Invalid name, name cannot be only whitespaces";
      }

      //user phone number validation
      if (this.checkoutForm.controls['phone'].errors?.['required']) {
        this.errorPhone = true;
        this.errorPhoneMsg = "Please enter phone number";
      }
      if (this.checkoutForm.controls['phone'].errors?.['pattern']) {
        this.errorPhone = true;
        this.errorPhoneMsg = "Invalid phone number";
      }

      //user email validation
      if (this.checkoutForm.controls['email'].errors?.['required']) {
        this.errorEmail = true;
        this.errorEmailMsg = "Please enter your email";
      }
      if (this.checkoutForm.controls['email'].errors?.['email']) {
        this.errorEmail = true;
        this.errorEmailMsg = "Invalid email";
      }

      //user address validation
      if (this.checkoutForm.controls['address'].errors?.['required']) {
        this.errorAddress = true;
        this.errorAddressMsg = "Please enter your address";
      }
      if (this.checkoutForm.controls['address'].errors?.['minlength'] || this.checkoutForm.controls['address'].errors?.['maxlength']) {
        this.errorAddress = true;
        this.errorAddressMsg = "Invalid address";
      }

      this.markInvalidField(this.checkoutForm)
      this.toastService.show('Error while entering form details', ToastType.error)
      return;
    } else {
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

      let customerName = `${val.ftname} ${val.ltname}`;

      let orderDetail: OrderDetail = {
        id: uuid(),
        date: this.billDate,
        name: customerName,
        phone: val.phone,
        address: val.address,
        email: val.email,
        products: JSON.stringify(this.cartItems),
        total: this.subTotal,
      };

      this.paymentReceipt = {
        date: this.billDate,
        name: customerName,
        phone: val.phone,
        address: val.address,
        products: this.cartItems,
        subTotal: this.subTotal
      }
      // window.scrollTo({
      //   top: 0,
      //   behavior: 'smooth'
      // });
      window.scroll(0,0)
      this.showBill = true;

      let headers = new Headers({
        'Content-Type': 'application/json'
      })

      let url = 'https://script.google.com/macros/s/AKfycbwmiydpSn6KO_eKGxwAd8x5rGSvdPsj6zTRG5TaCQnjJO835VcWA5W5E4APMc705nio/exec';

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

          const elem = document.getElementById('payment-receipt');
          convertToPdf(elem!, 'payment_bill.pdf');

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

  closeBill() {
    this.showBill = false;
  }

  ngOnDestroy() {
    this.getItemsSubscription?.unsubscribe();
    this.deleteItemSubscription?.unsubscribe();
    this.increaseQuantitySubscription?.unsubscribe();
    this.decreaseQuantitySubscription?.unsubscribe();
    this.setQuantitySubscription?.unsubscribe();
  }

}
