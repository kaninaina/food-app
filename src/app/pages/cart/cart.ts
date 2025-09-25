import { Component, inject, OnInit } from '@angular/core';
import { CartItemOperationType, Dish } from '../../models/common';
import { CartService } from '../../services/cart/cart';
import { DishCard } from '../../components/dish-card/dish-card';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'], // corrected from styleUrl to styleUrls
  imports: [DishCard, RouterLink, TranslatePipe],
  standalone: true, // added standalone for consistency
})
export class Cart implements OnInit {
  // Injecting CartService to manage cart operations
  private cartService: CartService = inject(CartService);

  // Array to hold dishes in the cart
  cartItems: Dish[] = [];

  // Total price of all items in the cart
  totalPrice: number = 0;

  // Array of selected cart item IDs (if needed for bulk actions)
  selectedCartItems: string[] = [];

  ngOnInit(): void {
    // Subscribe to the cart observable to get real-time cart updates
    this.cartService.cart$.subscribe((data: Dish[]) => {
      this.cartItems = data;

      // Calculate total price with proper decimal formatting
      this.totalPrice = parseFloat(
        data.reduce((acc, item) => acc + item.price * (item.quantity ?? 0), 0).toFixed(2)
      );
    });
  }

  handleQuantityChange({ dish, type }: { dish: Dish; type: CartItemOperationType }) {
    if (type === 'increment') {
      this.cartService.increaseItemQuantity(dish);
    } else if (type === 'decrement') {
      this.cartService.decreaseItemQuantity(dish.id);
    }
  }
}
