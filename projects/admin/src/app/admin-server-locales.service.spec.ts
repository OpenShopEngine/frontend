import { TestBed } from '@angular/core/testing';

import { AdminServerLocalesService } from './admin-server-locales.service';

describe('AdminServerLocalesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminServerLocalesService = TestBed.get(AdminServerLocalesService);
    expect(service).toBeTruthy();
  });
});
