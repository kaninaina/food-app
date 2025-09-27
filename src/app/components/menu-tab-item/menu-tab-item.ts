import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CartItemOperationType, Dish } from '../../models/common';
import { DishCard } from '../dish-card/dish-card';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { CartService } from '../../services/cart/cart';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-menu-tab-item',
  imports: [DishCard, CommonModule, UpperCasePipe, TranslatePipe],
  templateUrl: './menu-tab-item.html',
  styleUrl: './menu-tab-item.css',
})
export class MenuTabItem implements OnChanges {
  @Input() dishes: Dish[] = [];
  cartService = inject(CartService);

  filteredDishes: Dish[] = [];
  filterType: 'all' | 'veg' | 'nonveg' = 'all';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dishes']) {
      this.applyFilter(this.filterType); // re-apply filter whenever dishes change
    }
  }
  applyFilter(type: 'all' | 'veg' | 'nonveg') {
    this.filterType = type;
    if (type === 'all') {
      this.filteredDishes = [...this.dishes];
    } else if (type === 'veg') {
      this.filteredDishes = this.dishes.filter((d) => d.isVegetarian);
    } else {
      this.filteredDishes = this.dishes.filter((d) => !d.isVegetarian);
    }
  }

  handleQuantityChange({ dish, type }: { dish: Dish; type: CartItemOperationType }) {
    if (type === 'increment') {
      this.cartService.increaseItemQuantity(dish);
    } else if (type === 'decrement') {
      this.cartService.decreaseItemQuantity(dish.id);
    }
  }
}
