import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  cartService: CartService = inject(CartService);
  cartQuantityCount: number = 0;
  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cartQuantityCount = cart.reduce((sum, item) => sum + (item?.quantity ?? 0), 0);
    });
  }
}
