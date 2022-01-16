import { TestBed } from '@angular/core/testing';

import { AdminFileService } from './admin-file.service';

describe('AdminFileService', () => {
  let service: AdminFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
