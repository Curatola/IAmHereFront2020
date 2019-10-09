import { TestBed } from '@angular/core/testing';

import { SyncronizationService } from './syncronization.service';

describe('SincronizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SyncronizationService = TestBed.get(SyncronizationService);
    expect(service).toBeTruthy();
  });
});
