import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuItemCreateComponent } from './admin-menu-item-create.component';

describe('AdminMenuItemCreateComponent', () => {
  let component: AdminMenuItemCreateComponent;
  let fixture: ComponentFixture<AdminMenuItemCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMenuItemCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMenuItemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
