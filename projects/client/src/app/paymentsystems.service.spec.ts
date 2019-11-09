import { TestBed } from '@angular/core/testing';

import { PaymentsystemsService } from './paymentsystems.service';

describe('PaymentsystemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentsystemsService = TestBed.get(PaymentsystemsService);
    expect(service).toBeTruthy();
  });
});
