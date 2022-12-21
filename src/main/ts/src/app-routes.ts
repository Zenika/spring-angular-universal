import { Routes } from '@angular/router'
import HomeComponent from './app/catalog/home.component'
import BasketComponent from './app/basket/basket.component'

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'basket',
    component: BasketComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
