import { TestBed } from '@angular/core/testing';

import { AdminTransactionsService } from './admin-transactions.service';

describe('AdminTransactionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminTransactionsService = TestBed.get(AdminTransactionsService);
    expect(service).toBeTruthy();
  });
});
