import { Component, inject, OnInit } from '@angular/core';
import { Dish } from '../../models/common';
import { Cart as CartService } from '../../services/cart';
import { DishCard } from '../../components/dish-card/dish-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [DishCard, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cart: CartService = inject(CartService);
  cartItems: Dish[] = [];
  totalPrice: number = 0;
  selectedCartItems: string[] = [];
  ngOnInit(): void {
    this.cart.cart$.subscribe((data) => {
      this.cartItems = data;
      this.totalPrice = parseFloat(
        data.reduce((a, b) => a + b.price * (b?.quantity ?? 0), 0).toFixed(2)
      );
    });
  }
}
