import { Component, inject } from '@angular/core';
import { Cart } from '../../services/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  cart: Cart = inject(Cart);

  cartCount: number = 0;
  ngOnInit(): void {
    this.cart.cart$.subscribe((cart) => {
      this.cartCount = cart.reduce((sum, item) => sum + (item?.quantity ?? 0), 0);
    });
  }
}
