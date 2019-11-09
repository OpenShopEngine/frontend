import { TestBed } from '@angular/core/testing';

import { AdminPaymentsystemsService } from './admin-paymentsystems.service';

describe('AdminPaymentsystemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminPaymentsystemsService = TestBed.get(AdminPaymentsystemsService);
    expect(service).toBeTruthy();
  });
});
