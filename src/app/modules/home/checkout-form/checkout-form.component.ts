import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/interface/cart-item';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from '../../shared/toast/toast.modal';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private cartService: CartService, private toastService:ToastService) { }
  prevRoute?: string | null;
  cartItems: CartItem[] = [];
  getItemsSubscription?: Subscription;
  subTotal: number = 0;

  ngOnInit(): void {
    setTimeout(()=>{
      this.toastService.show("Your receipt has been downloaded", ToastType.success);
    }, 5000);
    // console.log(this.route.snapshot.paramMap.get('previousRoute'));
    // this.prevRoute = this.route.snapshot.paramMap.get('previousRoute');
    // if(this.prevRoute === null || this.prevRoute !== '/home/cart'){
    //   this.router.navigate(['/home/']);
    // }
    // this.getItemsSubscription = this.cartService.getCartDetails().subscribe({
    //   next: (data) => {
    //     this.cartItems = data;
    //     this.calculateSubTotal();  
    //   },
    //   error: (err) => {
    //     console.error(err);
    //   }
    // })
  }

  // calculateSubTotal(): void {
  //   this.subTotal = 0;
  //   this.cartItems.forEach((cart) => {
  //     this.subTotal = this.subTotal + cart.total;
  //   });
  // }


  // ngOnDestroy(){
  //   this.getItemsSubscription?.unsubscribe();
  // }
}
