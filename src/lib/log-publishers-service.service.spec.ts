import { TestBed } from '@angular/core/testing';

import { LogPublishersServiceService } from './log-publishers-service.service';

describe('LogPublishersServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogPublishersServiceService = TestBed.get(LogPublishersServiceService);
    expect(service).toBeTruthy();
  });
});
