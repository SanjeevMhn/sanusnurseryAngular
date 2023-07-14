import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/services/product.service';
import { faPlus, faMinus, faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
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
  relatedProducts?: Product[] = [];

  faPlus = faPlus;
  faMinus = faMinus;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  getPlantFromIdSubscription?: Subscription;
  getRelatedProductsSubscription?: Subscription;

  selectedProductImage = '';
  inStock?: boolean = false;
  prodCatName?: string;

  @ViewChild('scrollContainer', { static: false }) scrollContainer?: ElementRef;
  @ViewChild('productQuantityInput', { static: false }) productQuantityInput?: ElementRef<HTMLInputElement>;

  constructor(private route: ActivatedRoute,
    private product: ProductService,
    private renderer: Renderer2,
    private router: Router,
    private cart: CartService,
    private toastService: ToastService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProduct(this.productId);
  }

  // ngAfterViewInit():void{
  //   this.productQuantityInput?.nativeElement.focus();
  // }

  getProduct(id: number): void {
    this.getPlantFromIdSubscription = this.product.getPlantFromId(id)
      .subscribe({
        next: (data:any) => {
          this.productDetail = data.product[0];
          this.selectedProductImage = this.productDetail!.prod_img;
          this.inStock = this.productDetail!.prod_inStock;
          this.getProductCatName(this.productDetail!.prod_category);
        },
        error: (err) => {
          console.error(err)
        }
      })
  }

  getProductCatName(cat_id: number){
    this.product.getPlantCatgoryById(cat_id).subscribe({
      next: (data: any) => {
        this.prodCatName = data.product_category[0].prod_cat_name;
        this.getRelatedProducts(this.prodCatName!,this.productDetail!.prod_id);
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }


  getRelatedProducts(type: string,id:number): void {
    this.getRelatedProductsSubscription = this.product.getRelatedPlants(type,id).subscribe({
      next: (data:any) => {
        this.relatedProducts = data.products;
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

  setProductQuantity(event: any) {
    this.productQuantity = event.target.value;
    // console.log(this.productQuantity);
  }

  addToCart(): void {
    if (this.productQuantity > 0 && this.productQuantity) {

      let cartItem: CartItem = {
        ...this.productDetail!,
        quantity: this.productQuantity,
        total: this.productDetail?.prod_price! * this.productQuantity,
      };
      this.cart.addToCart(cartItem);
      this.toastService.show("Added to cart", ToastType.success);
    } else {

      this.toastService.show("Please enter product quantity", ToastType.error);
    }
  }

  buyNow(): void {
    if (this.productQuantity > 0 && this.productQuantity) {
      let cartItem: CartItem = {
        ...this.productDetail!,
        quantity: this.productQuantity,
        total: this.productDetail?.prod_price! * this.productQuantity,
      };
      this.cart.addToCart(cartItem);
      this.router.navigate(['/home/cart']);
    } else {

      this.toastService.show("Please enter product quantity", ToastType.error);
    }
  }



}
