import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersianDatepikkerComponent } from './persian-datepikker.component';

describe('PersianDatepikkerComponent', () => {
  let component: PersianDatepikkerComponent;
  let fixture: ComponentFixture<PersianDatepikkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersianDatepikkerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersianDatepikkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
