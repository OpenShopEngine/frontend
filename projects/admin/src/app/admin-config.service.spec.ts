import { TestBed } from '@angular/core/testing';

import { AdminConfigService } from './admin-config.service';

describe('AdminConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminConfigService = TestBed.get(AdminConfigService);
    expect(service).toBeTruthy();
  });
});
