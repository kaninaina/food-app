import { Component, inject, OnInit } from '@angular/core';
import { MenuTabItem } from '../../components/menu-tab-item/menu-tab-item';
import { combineLatest } from 'rxjs';
import { CartService } from '../../services/cart/cart';
import { MenuService } from '../../services/menu/menu';
import { Category, Dish } from '../../models/common';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuTabItem, MatTabsModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'], // corrected from styleUrl to styleUrls
})
export class Menu implements OnInit {
  // Categories with dishes to display
  categories: Category[] = [];
  menuService: MenuService = inject(MenuService);
  cartService: CartService = inject(CartService);

  ngOnInit(): void {
    // Combine latest values from menu API and cart observable
    combineLatest([this.menuService.getMenu(), this.cartService.cart$]).subscribe(
      ([menuResponse, cart]) => {
        const cartItems = cart.reduce((acc, data) => ({ ...acc, [data.id]: data }), {});

        // Map menu categories and dishes, adding quantity from cart if present
        this.categories = menuResponse.categories.map((category) => {
          return {
            ...category,
            dishes: category.dishes.map((dish) => {
              const cartItem = cartItems[dish.id as keyof typeof cartItems] as Dish;
              return {
                ...dish,
                quantity: cartItem ? cartItem.quantity : 0, // set quantity from cart or 0
              };
            }),
          };
        });
      }
    );
  }
}
