import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemUnitListComponent } from './menu-item-unit-list.component';

describe('MenuItemUnitListComponent', () => {
  let component: MenuItemUnitListComponent;
  let fixture: ComponentFixture<MenuItemUnitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemUnitListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
