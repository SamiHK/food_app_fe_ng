import { TestBed } from '@angular/core/testing';

import { MenuItemUnitService } from './menu-item-unit.service';

describe('MenuItemUnitService', () => {
  let service: MenuItemUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuItemUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
