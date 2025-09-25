import { Component, inject, OnInit } from '@angular/core';
import { Dish } from '../../models/common';
import { Cart as CartService } from '../../services/cart';
import { DishCard } from '../../components/dish-card/dish-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'], // corrected from styleUrl to styleUrls
  imports: [DishCard, RouterLink],
  standalone: true, // added standalone for consistency
})
export class Cart implements OnInit {
  // Injecting CartService to manage cart operations
  private cart: CartService = inject(CartService);

  // Array to hold dishes in the cart
  cartItems: Dish[] = [];

  // Total price of all items in the cart
  totalPrice: number = 0;

  // Array of selected cart item IDs (if needed for bulk actions)
  selectedCartItems: string[] = [];

  ngOnInit(): void {
    // Subscribe to the cart observable to get real-time cart updates
    this.cart.cart$.subscribe((data: Dish[]) => {
      this.cartItems = data;

      // Calculate total price with proper decimal formatting
      this.totalPrice = parseFloat(
        data.reduce((acc, item) => acc + item.price * (item.quantity ?? 0), 0).toFixed(2)
      );
    });
  }
}
