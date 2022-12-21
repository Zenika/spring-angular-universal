import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../core/model/product';
import { Customer } from '../core/model/customer';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Observable } from 'rxjs'
import { AsyncPipe, CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common'
import { BasketService } from './shared/basket.service'

type CustomerForm = { [key in keyof Customer]: FormControl<Customer[key]> }

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgFor,
    AsyncPipe,
    CurrencyPipe,
    ReactiveFormsModule,
  ]
})
export default class BasketComponent implements OnInit {
  basket$!: Observable<Product[]>;
  customer!: Customer;
  customerForm!: FormGroup<CustomerForm>

  constructor (private router: Router, private basketService: BasketService, private fb: FormBuilder) {
  }

  ngOnInit (): void {
    this.customerForm = this.fb.nonNullable.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      creditCard: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{3}$/)]]
    })
    this.basket$ = this.basketService.getBasket()
    this.customer = new Customer();
  }

  checkout (e: Event): void {
    e.stopPropagation();
    e.preventDefault();
    this.basketService.checkout()
    this.router.navigate(['']);
  }
}
