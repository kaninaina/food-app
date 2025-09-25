import { Component, Input } from '@angular/core';
import { Dish } from '../../models/common';
import { Cart } from '../../services/cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dish-card',
  imports: [CommonModule],
  templateUrl: './dish-card.html',
  styleUrl: './dish-card.css',
})
export class DishCard {
  @Input() dish!: Dish;
  constructor(private cart: Cart) {}
  addToCart() {
    this.cart.addItem(this.dish);
  }
  removeCart() {
    this.cart.removeItem(this.dish.id);
  }
}
