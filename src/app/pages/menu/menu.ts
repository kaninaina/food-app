import { Component, OnInit } from '@angular/core';
import { MenuTabItem } from '../../components/menu-tab-item/menu-tab-item';
import { combineLatest } from 'rxjs';
import { Cart } from '../../services/cart';
import { Menu as MenuService } from '../../services/menu';
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

  // Items currently in the cart
  cartItems: Dish[] = [];

  constructor(private menuService: MenuService, private cartService: Cart) {}

  ngOnInit(): void {
    // Combine latest values from menu API and cart observable
    combineLatest([this.menuService.getMenu(), this.cartService.cart$]).subscribe(
      ([menuResponse, cart]) => {
        this.cartItems = cart;

        // Map menu categories and dishes, adding quantity from cart if present
        this.categories = menuResponse.categories.map((category) => {
          return {
            ...category,
            dishes: category.dishes.map((dish) => {
              const cartItem = cart.find((item) => item.id === dish.id);
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
