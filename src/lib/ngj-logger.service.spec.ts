import { TestBed } from '@angular/core/testing';

import { NgjLoggerService } from './ngj-logger.service';

describe('NgjLoggerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgjLoggerService = TestBed.get(NgjLoggerService);
    expect(service).toBeTruthy();
  });
});
