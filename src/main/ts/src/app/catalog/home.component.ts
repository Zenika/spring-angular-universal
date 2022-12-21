import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';

import { Product } from '../core/model/product';
import { CatalogService } from './shared/catalog.service'
import { Observable } from 'rxjs'
import { AsyncPipe, CurrencyPipe, NgForOf, NgIf } from '@angular/common'
import { ProductComponent } from './ui/product/product.component'
import { RouterLink } from '@angular/router'
import { BasketService } from '../basket/shared/basket.service'
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    AsyncPipe,
    CurrencyPipe,
    ProductComponent,
    NgForOf,
    NgIf,
  ],
  standalone: true
})
export default class HomeComponent implements OnInit {
  products$!: Observable<Product[]>;
  total$!: Observable<number>;

  constructor (protected catalogService: CatalogService,
               private basketService: BasketService
  ) {
  }

  ngOnInit (): void {
    this.products$ = this.catalogService.getProductsFromNetwork();
    this.total$ = this.basketService.getTotal()
  }


  addToBasket (product: Product): void {
    this.catalogService.decrementStocks(product)
    this.basketService.addToBasket(product)
  }

  isAvailable (product: Product): boolean {
    return CatalogService.isAvailable(product)
  }

  byId(index: number, product: Product) {
    return product.title + product.description
  }

}
