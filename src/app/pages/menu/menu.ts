import { Component, OnInit } from '@angular/core';
import { MenuTabItem } from '../../components/menu-tab-item/menu-tab-item';
import { combineLatest } from 'rxjs';
import { Cart } from '../../services/cart';
import { Menu as MenuService } from '../../services/menu';
import { Category, Dish } from '../../models/common';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-menu',
  imports: [MenuTabItem, MatTabsModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  standalone: true,
})
export class Menu implements OnInit {
  categories: Category[] = [];
  cartItems: Dish[] = [];
  constructor(private menuService: MenuService, private cartService: Cart) {}
  ngOnInit(): void {
    combineLatest([this.menuService.getMenu(), this.cartService.cart$]).subscribe(
      ([menuResponse, cart]) => {
        this.cartItems = cart;
        this.categories = menuResponse.categories.map((category) => {
          return {
            ...category,
            dishes: category.dishes.map((dish) => {
              const cartItem = cart.find((item) => item.id === dish.id);
              return { ...dish, quantity: cartItem ? cartItem.quantity : 0 };
            }),
          };
        });
      }
    );
  }
}
