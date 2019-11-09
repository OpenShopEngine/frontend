import { TestBed } from '@angular/core/testing';

import { ServerLocalesService } from './server-locales.service';

describe('ServerLocalesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerLocalesService = TestBed.get(ServerLocalesService);
    expect(service).toBeTruthy();
  });
});
