import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }
  prevRoute?: string | null;

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('previousRoute'));
    this.prevRoute = this.route.snapshot.paramMap.get('previousRoute');
    if(this.prevRoute === null){
      this.router.navigate(['/home/']);
    }
    
  }

}
