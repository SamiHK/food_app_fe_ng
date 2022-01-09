import { TestBed } from '@angular/core/testing';

import { ManagerSalespersonService } from './manager-salesperson.service';

describe('ManagerSalespersonService', () => {
  let service: ManagerSalespersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerSalespersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
