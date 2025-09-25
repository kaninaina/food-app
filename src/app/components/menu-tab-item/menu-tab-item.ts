import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Dish } from '../../models/common';
import { DishCard } from '../dish-card/dish-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-tab-item',
  imports: [DishCard, CommonModule],
  templateUrl: './menu-tab-item.html',
  styleUrl: './menu-tab-item.css',
})
export class MenuTabItem implements OnInit, OnChanges {
  @Input() dishes: Dish[] = [];

  filteredDishes: Dish[] = [];
  filterType: 'all' | 'veg' | 'nonveg' = 'all';

  ngOnInit() {
    this.filteredDishes = this.dishes; // initially show all
  }
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
}
