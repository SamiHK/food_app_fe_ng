import { TestBed } from '@angular/core/testing';

import { SalespersonGuard } from './salesperson.guard';

describe('SalespersonGuard', () => {
  let guard: SalespersonGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SalespersonGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
