import { Injectable } from '@angular/core';
import { Product } from '../../core/model/product'
import { BehaviorSubject, map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basket$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  getBasket() {
    return this.basket$.asObservable()
  }

  getTotal(): Observable<number> {
    return this.basket$.pipe(
      map(basket => basket.reduce((previous, next) => previous + next.price, 0))
    );
  }

  addToBasket(product: Product): void {
    this.basket$.next([...this.basket$.getValue(), product]);
  }

  checkout(): void {
    this.basket$.next([]);
  }
}
