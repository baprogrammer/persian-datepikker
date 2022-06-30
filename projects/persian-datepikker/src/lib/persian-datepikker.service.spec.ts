import { TestBed } from '@angular/core/testing';

import { PersianDatepikkerService } from './persian-datepikker.service';

describe('PersianDatepikkerService', () => {
  let service: PersianDatepikkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersianDatepikkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
