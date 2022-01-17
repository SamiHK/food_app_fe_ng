import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuItemFormComponent } from './admin-menu-item-form.component';

describe('AdminMenuItemFormComponent', () => {
  let component: AdminMenuItemFormComponent;
  let fixture: ComponentFixture<AdminMenuItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMenuItemFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMenuItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
