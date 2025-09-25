import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dish } from '../models/common';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  private cartSubject = new BehaviorSubject<Dish[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    const localCartItems = JSON.parse(localStorage.getItem('cart') ?? '[]');
    this.cartSubject.next(localCartItems);
  }

  addItem(dish: Dish) {
    const current = [...this.cartSubject.value];
    const index = current.findIndex((item) => item.id === dish.id);
    if (index >= 0) {
      (current[index] as any).quantity += 1;
    } else {
      current.push({ ...dish, quantity: 1 });
    }
    this.cartSubject.next(current);
    localStorage.setItem('cart', JSON.stringify(current));
  }

  removeItem(dishId: number) {
    const current = this.cartSubject.value
      .map((item) =>
        item.id === dishId ? { ...item, quantity: Math.max(0, (item?.quantity ?? 0) - 1) } : item
      )
      .filter((item) => (item?.quantity ?? 0) > 0);
    this.cartSubject.next(current);
    localStorage.setItem('cart', JSON.stringify(current));
  }

  deleteItem(dishId: number) {
    const current = this.cartSubject.value.filter((item) => item.id !== dishId);
    this.cartSubject.next(current);
    localStorage.setItem('cart', JSON.stringify(current));
  }
}
