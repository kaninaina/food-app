import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItemOperationType, Dish } from '../../models/common';
import { CommonModule, DecimalPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-dish-card',
  imports: [CommonModule, DecimalPipe, TranslatePipe],
  templateUrl: './dish-card.html',
  styleUrl: './dish-card.css',
})
export class DishCard {
  @Output() onUpdateQuantity = new EventEmitter<{ dish: Dish; type: CartItemOperationType }>();
  @Input() dish!: Dish;

  addToCart() {
    this.onUpdateQuantity.emit({ dish: this.dish, type: 'increment' });
  }
  removeFromCart() {
    this.onUpdateQuantity.emit({ dish: this.dish, type: 'decrement' });
  }
}
