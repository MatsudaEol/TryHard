import { TestBed } from '@angular/core/testing';

import { BdtempService } from './bdtemp.service';

describe('BdtempService', () => {
  let service: BdtempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdtempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
