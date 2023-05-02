import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/services/product.service';
import { faPlus, faMinus, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/interface/cart-item';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from '../../shared/toast/toast.modal';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
})
export class ProductdetailComponent implements OnInit {

  productId?: number;
  productDetail?: Product;
  productQuantity: number = 1;
  relatedProducts: Product[] = [];

  faPlus = faPlus;
  faMinus = faMinus;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  getPlantFromIdSubscription?: Subscription;
  getRelatedProductsSubscription?: Subscription;

  selectedProductImage = '';
  inStock?: boolean = false;

  @ViewChild('scrollContainer', { static: false }) scrollContainer?: ElementRef;

  constructor(private route: ActivatedRoute, 
              private product: ProductService, 
              private renderer: Renderer2, 
              private router: Router,
              private cart: CartService,
              private toastService: ToastService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProduct(this.productId);
  }

  getProduct(id: number): void {
    this.getPlantFromIdSubscription = this.product.getPlantFromId(id)
      .subscribe({
        next: (data) => {
          this.productDetail = data;
          this.selectedProductImage = this.productDetail.img;
          this.inStock = this.productDetail.inStock;
          this.getRelatedProducts(this.productDetail.type, this.productDetail.id);
        },
        error: (err) => {
          console.error(err)
        }
      })
  }

  getRelatedProducts(type: string, id: number): void {
    this.getRelatedProductsSubscription = this.product.getPlantFromType(type, id).subscribe({
      next: (data) => {
        this.relatedProducts = data;
        // console.log(this.relatedProducts);
      },
      error: (err) => {
        console.error(err);

      }
    })
  }

  ngOnDestroy(): void {
    this.getPlantFromIdSubscription?.unsubscribe();
    this.getRelatedProductsSubscription?.unsubscribe();
  }



  increaseQuantity(): void {
    this.productQuantity++;
  }

  decreaseQuantity(): void {
    if (this.productQuantity > 1) {
      this.productQuantity--;
    }
  }

  scrollLeft(): void {
    this.renderer.setProperty(this.scrollContainer?.nativeElement, 'scrollLeft', this.scrollContainer?.nativeElement.scrollLeft - 290);
  }

  scrollRight(): void {
    this.renderer.setProperty(this.scrollContainer?.nativeElement, 'scrollLeft', this.scrollContainer?.nativeElement.scrollLeft + 290);
  }

  reload(): void {
    this.selectedProductImage = '';
    // const getId = Number(this.route.snapshot.paramMap.get('id'));
    // this.getProduct(getId);
  }

  addToCart(): void{
    let cartItem: CartItem = {
      ...this.productDetail!,
      quantity: this.productQuantity,
      total: this.productDetail?.price! * this.productQuantity,
    };
    this.cart.addToCart(cartItem);
    this.toastService.show("Added to cart",ToastType.success);
  }

}
