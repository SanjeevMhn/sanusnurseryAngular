import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interface/product';
import { CartItem } from '../interface/cart-item';

const baseUrl = "./assets/json/plants.json";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems = new BehaviorSubject<CartItem[]>([]);

  constructor() { }


  addToCart(product: CartItem): void {
    const currentCart = this.cartItems.getValue();

    if (!currentCart.some(item => item.prod_id === product.prod_id)) {
      const updatedCart = [ product,...currentCart];
      this.cartItems.next(updatedCart);
    }

    // return this.cartItems;
  }

  getCartDetails(): BehaviorSubject<CartItem[]> {
    return this.cartItems;
  }

  removeCartItem(item: CartItem): BehaviorSubject<CartItem[]> {
    const currentCart = this.cartItems.getValue();
    const updatedCart = currentCart.filter(cart => cart.prod_id !== item.prod_id);
    this.cartItems.next(updatedCart);
    return this.cartItems;
  }

  clearCart() {
    return this.cartItems.next([]);
  }

  decreaseCartItemQuantity(item: CartItem): BehaviorSubject<CartItem[]> {
    const currentCart = this.cartItems.getValue();
    const index = currentCart.findIndex(cart => cart.prod_id === item.prod_id);
    const updatedCart = currentCart;
    let updatedQuantity = item.quantity > 1 ? item.quantity - 1 : 1;
    let updatedTotal = item.prod_price * updatedQuantity;
    const updatedCartObject: CartItem = {
      ...item,
      quantity: updatedQuantity,
      total: updatedTotal,
    }
    updatedCart[index] = updatedCartObject
    this.cartItems.next(updatedCart);
    return this.cartItems;
  }

  increaseCartItemQuantity(item: CartItem): BehaviorSubject<CartItem[]> {
    const currentCart = this.cartItems.getValue();
    const index = currentCart.findIndex(cart => cart.prod_id === item.prod_id);
    const updatedCart = currentCart;
    let updatedQuantity = Number(item.quantity) + 1;
    let updatedTotal = item.prod_price * updatedQuantity;
    const updatedCartObject: CartItem = {
      ...item,
      quantity: updatedQuantity,
      total: updatedTotal
    }
    updatedCart[index] = updatedCartObject
    this.cartItems.next(updatedCart);
    return this.cartItems;
  }

  setCartItemQuantity(item: CartItem, quantity: number): BehaviorSubject<CartItem[]> {
    const currentCart = this.cartItems.getValue();
    const index = currentCart.findIndex(cart => cart.prod_id === item.prod_id);
    const updatedCart = currentCart;
    let updatedQuantity = quantity;
    let updatedTotal = item.prod_price * updatedQuantity;
    const updatedCartObject: CartItem = {
      ...item,
      quantity: updatedQuantity,
      total: updatedTotal
    }
    updatedCart[index] = updatedCartObject
    this.cartItems.next(updatedCart);
    return this.cartItems;
  }
}
