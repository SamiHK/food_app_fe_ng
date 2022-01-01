import { TestBed } from '@angular/core/testing';

import { AdminBranchService } from './admin-branch.service';

describe('AdminBranchService', () => {
  let service: AdminBranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminBranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
