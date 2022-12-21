import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { Product } from '../../../core/model/product';
import { CatalogService } from '../../shared/catalog.service'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { CurrencyPipe, UpperCasePipe } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    UpperCasePipe,
    CurrencyPipe,
    MatButtonModule
  ],

  animations: [
    trigger("isLast", [
      state("true", style({
        background: "rgba(255, 0, 0, .4)"
      })),
      state("false", style({
        background: "white"
      })),
      transition("true <=> false", animate("500ms ease-in-out", style({
        transform: "rotate(360deg)",
        background: "rgba(255, 0, 0, .4)"
      })))
    ])
  ]
})
export class ProductComponent {
  @Input() data!: Product;

  @Output() addToBasket = new EventEmitter<Product>();

  addToBasketClick (): void {
    this.addToBasket.emit(this.data);
  }

  isTheLast (): boolean {
    return CatalogService.isTheLast(this.data);
  }


}
