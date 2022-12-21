import { Injectable } from '@angular/core';
import { Product } from '../../core/model/product'
import { BehaviorSubject, delay, first, interval, map, mapTo, Observable, of, timeout } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private products: BehaviorSubject<Product[]> = new BehaviorSubject([
    {
      title: 'Coding the welsch',
      description: 'Tee-shirt col rond - Homme',
      photo: 'https://s3.eu-central-1.amazonaws.com/balibart-s3/Products/5e870cc921c8a10011479d4b/customProduct/t-shirt%20zenika%204.png',
      price: 20,
      stock: 2
    },
    {
      title: 'Coding the world',
      description: 'Tee-shirt col rond - Homme',
      photo: 'https://s3.eu-central-1.amazonaws.com/balibart-s3/Products/5e8701cb6dd1fd00111a9613/customProduct/t-shirt%20zenika%202.png',
      price: 18,
      stock: 2
    },
    {
      title: 'Duck Vador',
      description: 'Tee-shirt col rond - Femme',
      photo: 'https://s3.eu-central-1.amazonaws.com/balibart-s3/Products/5e8717235ec8da0011d86e64/customProduct/Mockup%20zenika%2066.png',
      price: 21,
      stock: 2
    },
    {
      title: 'Coding the snow',
      description: 'Tee-shirt col rond - Femme',
      photo: 'https://s3.eu-central-1.amazonaws.com/balibart-s3/Products/5e871ba921c8a10011479d5b/customProduct/Mockup zenika 54.png',
      price: 19,
      stock: 2
    }
  ])

  static isAvailable (product: Product): boolean {
    return product.stock > 0;
  }

  static isTheLast (product: Product): boolean {
    return product.stock === 1;
  }

  getProductsFromNetwork (): Observable<Product[]> {
    return this.products
  }

  decrementStocks (product: Product) {
    product.stock--
  }
}
