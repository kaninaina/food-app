import { Routes } from '@angular/router';
import { RootLayout } from './layouts/root-layout/root-layout';
import { Menu } from './pages/menu/menu';
import { Authentication } from './pages/authentication/authentication';
import { Cart } from './pages/cart/cart';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '',
    component: RootLayout,
    children: [
      {
        path: 'menu',
        component: Menu,
      },
      {
        path: 'cart',
        component: Cart,
      },
    ],
  },
  {
    path: 'auth',
    component: Authentication,
  },
  {
    path: '**',
    component: NotFound,
  },
];
