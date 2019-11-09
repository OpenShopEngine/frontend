import { TestBed } from '@angular/core/testing';

import { AdminCheckoutsService } from './admin-checkouts.service';

describe('AdminCheckoutsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminCheckoutsService = TestBed.get(AdminCheckoutsService);
    expect(service).toBeTruthy();
  });
});
