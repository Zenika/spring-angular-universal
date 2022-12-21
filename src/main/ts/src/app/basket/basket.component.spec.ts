import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { BasketComponent } from './basket.component';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketComponent ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });


  describe('checkout', () => {
    it('should route to home when successfully checkout',  () => {
      // given
      jest.spyOn(router, 'navigate');
      component.customerForm.controls.name?.setValue("John");
      component.customerForm.controls.address?.setValue("Nowhere");
      component.customerForm.controls.creditCard?.setValue("123-456");
      fixture.detectChanges();

      // when
      // fixture.nativeElement.querySelector('button').click();
      (fixture.nativeElement as HTMLElement).querySelector<HTMLFormElement>('form')?.submit();
      fixture.detectChanges();

      // then
      expect(component.customerForm.valid).toBeTruthy();
      expect(router.navigate).toHaveBeenCalledWith(['']);
    });

    it('should not route to home when invalid checkout', (() => {
      // given
      jest.spyOn(router, 'navigate');
      component.customerForm.controls.name.setValue("");
      component.customerForm.controls.address.setValue("");
      component.customerForm.controls.creditCard.setValue("INVALID");
      fixture.detectChanges();

      // when
      (fixture.nativeElement as HTMLElement).querySelector<HTMLFormElement>('form')?.submit();
      fixture.detectChanges();

      // then
      expect(component.customerForm.controls.name?.hasError('required')).toBeTruthy();
      expect(component.customerForm.invalid).toBeTruthy();
      expect(router.navigate).not.toHaveBeenCalled();
    }));
  });
});
