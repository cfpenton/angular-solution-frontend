import { TestBed } from '@angular/core/testing';

import { Common.ApiService } from './common.api.service';

describe('Common.ApiService', () => {
  let service: Common.ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Common.ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
