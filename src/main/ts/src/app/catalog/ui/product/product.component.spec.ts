import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { Product } from '../../../core/model/product';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent ]
    })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.data = new Product('title', 'description', 'photo', 42, 2);


    fixture.detectChanges();
  });

  it('[DOM] price should be rendered', () => {

    const product: Product = {
      price: 23,
      stock: 1,
      title: "T-shirt XL",
      description: "T-shirt super beau",
      photo: "t-shirt.jpg"
    }
    component.data = product

    fixture.detectChanges()

    const componentDom = fixture.nativeElement as HTMLElement
    const h3 = componentDom.querySelector<HTMLElement>("h3")?.textContent
    expect(h3).toContain("T-SHIRT XL - €23.00");
  });

  it('[DOM] should have class last when one item in stock', () => {
    const product: Product = {
      price: 23,
      stock: 1,
      title: "T-shirt XL",
      description: "T-shirt super beau",
      photo: "t-shirt.jpg"
    }
    component.data = product

    fixture.detectChanges()

    const componentDom = fixture.nativeElement as HTMLElement
    const classList = componentDom.querySelector<HTMLElement>(".product-item")?.classList
    expect(classList).toContain("last");
  });

  it('[DOM] should have class not last when more than one item in stock', () => {
    const product: Product = {
      price: 23,
      stock: 2,
      title: "T-shirt XL",
      description: "T-shirt super beau",
      photo: "t-shirt.jpg"
    }
    component.data = product

    fixture.detectChanges()

    const componentDom = fixture.nativeElement as HTMLElement
    const classList = componentDom.querySelector<HTMLElement>(".product-item")?.classList
    expect(classList).not.toContain("last");
  });

  it('[CLASS] should have class last when one item in stock', () => {
    const product: Product = {
      price: 23,
      stock: 1,
      title: "T-shirt XL",
      description: "T-shirt super beau",
      photo: "t-shirt.jpg"
    }
    component.data = product

    expect(component.isTheLast()).toBeTruthy()
  });

  it('[CLASS] should emit an event when its button is clicked', () => {
    const spyOutput = jest.spyOn(component.addToBasket, 'emit')

    component.addToBasketClick()

    expect(spyOutput).toHaveBeenCalledWith(component.data)
  });

  it('[DOM] should emit an event when its button is clicked', () => {
    const spyOutput = jest.spyOn(component.addToBasket, 'emit')

    const componentDom = fixture.nativeElement as HTMLElement
    componentDom.querySelector<HTMLButtonElement>("button")!.click()

    expect(spyOutput).toHaveBeenCalledWith(component.data)
  });
});
