import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dish } from '../models/common';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  // BehaviorSubject to hold the current cart state
  private cartSubject = new BehaviorSubject<Dish[]>([]);

  // Observable to allow subscription to cart changes
  cart$ = this.cartSubject.asObservable();

  constructor() {
    // Load cart items from localStorage on service initialization
    const localCartItems: Dish[] = JSON.parse(localStorage.getItem('cart') ?? '[]');
    this.cartSubject.next(localCartItems);
  }

  /**
   * Add a dish to the cart. If the dish already exists, increment its quantity.
   * @param dish - Dish to add
   */
  addItem(dish: Dish): void {
    const current = [...this.cartSubject.value];
    const index = current.findIndex((item) => item.id === dish.id);

    if (index >= 0) {
      // Increase quantity if dish already exists
      (current[index] as Dish & { quantity: number }).quantity += 1;
    } else {
      // Add new dish with initial quantity
      current.push({ ...dish, quantity: 1 });
    }

    this.updateCart(current);
  }

  /**
   * Remove one quantity of a dish from the cart. Remove the dish if quantity reaches 0.
   * @param dishId - ID of the dish to remove
   */
  removeItem(dishId: number): void {
    const current = this.cartSubject.value
      .map((item) =>
        item.id === dishId ? { ...item, quantity: Math.max(0, (item.quantity ?? 0) - 1) } : item
      )
      .filter((item) => (item.quantity ?? 0) > 0);

    this.updateCart(current);
  }

  /**
   * Delete a dish entirely from the cart regardless of its quantity
   * @param dishId - ID of the dish to delete
   */
  deleteItem(dishId: number): void {
    const current = this.cartSubject.value.filter((item) => item.id !== dishId);
    this.updateCart(current);
  }

  /**
   * Helper function to update BehaviorSubject and localStorage
   * @param cartItems - Updated cart array
   */
  private updateCart(cartItems: Dish[]): void {
    this.cartSubject.next(cartItems);
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }
}
