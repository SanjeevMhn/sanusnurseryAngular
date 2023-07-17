import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faClose, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from 'src/app/interface/cart-item';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  faClose = faClose;
  faMinus = faMinus;
  faPlus = faPlus;

  @Input() item?:CartItem;

  @Output() removeCartItemEvent = new EventEmitter<CartItem>();
  @Output() decreaseCartItemQuantityEvent = new EventEmitter<CartItem>();
  @Output() increaseCartItemQuantityEvent = new EventEmitter<CartItem>();
  @Output() setProductQuantityEvent = new EventEmitter();
  @Output() rempoveCartItemEvent = new EventEmitter<CartItem>();

  prodCatName?:string;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getPlantCatgoryById(this.item!.prod_category).subscribe({
      next:(data:any) => {
        this.prodCatName = data.product_category[0].prod_cat_name;
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }


  removeCartItem(){
    this.removeCartItemEvent.emit(this.item);
  }

  decreaseCartItemQuantity(){
    this.decreaseCartItemQuantityEvent.emit(this.item);
  }

  increaseCartItemQuantity(){
    this.increaseCartItemQuantityEvent.emit(this.item);
  }

  setProductQuantity(e:any){
    let setQuantity = e.target.value;
    let itemObj = {
      quantity: Number(setQuantity),
      item: this.item
    };
    this.setProductQuantityEvent.emit(itemObj);
  }



}
