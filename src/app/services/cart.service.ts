import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, concatMap, last, map, Observable, of, scan, startWith, takeLast } from "rxjs";
import { Product } from "../interface/product";
import { CartItem } from "../interface/cart-item";
import { AuthService } from "./auth.service";
import { ToastService } from "./toast.service";
import { ToastType } from "../modules/shared/toast/toast.modal";

const baseUrl = "./assets/json/plants.json";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);

  cartItems$ = this.cartItems.asObservable();

  constructor(private authService: AuthService,private toastService: ToastService) {}

  addToCart(product: CartItem): void {
    const currentCart = this.cartItems.getValue();

    if (!currentCart.some((item) => item.prod_id === product.prod_id)) {
      const updatedCart = [product, ...currentCart];
      sessionStorage.setItem("cart_items", JSON.stringify(updatedCart));
      this.cartItems.next(updatedCart);
    }

    // return this.cartItems;
  }

  getCartDetails(): Observable<CartItem[]> {
    if (this.cartItems.value.length == 0 || this.cartItems.value == null) {
      const cachedCartItems = sessionStorage.getItem("cart_items");
      if (cachedCartItems) {
        const parsedCachedCartItems: CartItem[] = [
          ...JSON.parse(cachedCartItems!),
        ];
        this.cartItems.next(parsedCachedCartItems);
        return this.cartItems.asObservable();
      } else {
        return this.cartItems.asObservable();
      }
    } else {
      return this.cartItems.asObservable();
    }
  }

  removeCartItem(item: CartItem) {
    const currentCart = this.cartItems.getValue();
    const updatedCart = currentCart.filter(
      (cart) => cart.prod_id !== item.prod_id,
    );
    sessionStorage.setItem("cart_items", JSON.stringify(updatedCart));
    this.cartItems.next(updatedCart);
  }

  clearCart(){
    sessionStorage.removeItem("cart_items");
    this.cartItems.next([]);
  }

  decreaseCartItemQuantity(item: CartItem){
    const currentCart = this.cartItems.getValue();
    const index = currentCart.findIndex(
      (cart) => cart.prod_id === item.prod_id,
    );
    const updatedCart = currentCart;
    let updatedQuantity = item.quantity > 1 ? item.quantity - 1 : 1;
    let updatedTotal = item.prod_price * updatedQuantity;
    const updatedCartObject: CartItem = {
      ...item,
      quantity: updatedQuantity,
      total: updatedTotal,
    };
    updatedCart[index] = updatedCartObject;
    this.cartItems.next(updatedCart);
    sessionStorage.setItem("cart_items", JSON.stringify(updatedCart));
  }

  increaseCartItemQuantity(item: CartItem) {
    const currentCart = this.cartItems.getValue();
    const index = currentCart.findIndex(
      (cart) => cart.prod_id === item.prod_id,
    );
    const updatedCart = currentCart;
    let updatedQuantity = Number(item.quantity) + 1;
    let updatedTotal = item.prod_price * updatedQuantity;
    const updatedCartObject: CartItem = {
      ...item,
      quantity: updatedQuantity,
      total: updatedTotal,
    };
    updatedCart[index] = updatedCartObject;
    this.cartItems.next(updatedCart);
    sessionStorage.setItem("cart_items", JSON.stringify(updatedCart));
  }

  setCartItemQuantity(
    item: CartItem,
    quantity: number,
  ){

    if(quantity > 0 && quantity){
      const currentCart = this.cartItems.getValue();
      const index = currentCart.findIndex(
        (cart) => cart.prod_id === item.prod_id,
      );
      const updatedCart = currentCart;
      let updatedQuantity = quantity;
      let updatedTotal = item.prod_price * updatedQuantity;
      const updatedCartObject: CartItem = {
        ...item,
        quantity: updatedQuantity,
        total: updatedTotal,
      };
      updatedCart[index] = updatedCartObject;
      this.cartItems.next(updatedCart);
      sessionStorage.setItem("cart_items", JSON.stringify(updatedCart));
    }else{
      this.toastService.show("Product quantity cannot be less than 1", ToastType.error);

    }
    
  }
}
