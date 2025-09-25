import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dish } from '../../models/common';

export interface CartItemType extends Dish {
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  /** BehaviorSubject to hold the current cart state */
  private cartSubject = new BehaviorSubject<CartItemType[]>([]);

  /** Observable to allow subscription to cart changes */
  cart$ = this.cartSubject.asObservable();

  constructor() {
    // Load cart items from localStorage on service initialization
    const storedCart: CartItemType[] = JSON.parse(localStorage.getItem('cart') ?? '[]');
    this.cartSubject.next(storedCart);
  }

  /**
   * Increase quantity of a dish in the cart.
   * If dish does not exist, add it with quantity = 1.
   * @param dish - Dish to add or update
   */
  increaseItemQuantity(dish: Dish): void {
    const updatedCart = [...this.cartSubject.value];
    const index = updatedCart.findIndex((item) => item.id === dish.id);
    if (index >= 0) {
      updatedCart[index].quantity += 1;
    } else {
      updatedCart.push({ ...dish, quantity: 1 });
    }
    this.updateCart(updatedCart);
  }

  /**
   * Decrease quantity of a dish in the cart.
   * Removes the dish entirely if quantity reaches 0.
   * @param dishId - ID of the dish to decrease
   */
  decreaseItemQuantity(dishId: number): void {
    const updatedCart = this.cartSubject.value
      .map((item) =>
        item.id === dishId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
      )
      .filter((item) => item.quantity > 0);

    this.updateCart(updatedCart);
  }

  // @param dishId - ID of the dish to remove
  removeItemCompletely(dishId: number): void {
    const updatedCart = this.cartSubject.value.filter((item) => item.id !== dishId);
    this.updateCart(updatedCart);
  }

  // Clear all items from the cart.
  clearCart(): void {
    this.updateCart([]);
  }

  // Helper function to update BehaviorSubject and localStorage
  private updateCart(CartItemTypes: CartItemType[]): void {
    this.cartSubject.next(CartItemTypes);
    localStorage.setItem('cart', JSON.stringify(CartItemTypes));
  }
}
