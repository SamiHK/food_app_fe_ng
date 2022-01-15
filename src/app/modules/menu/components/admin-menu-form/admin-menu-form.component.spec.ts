import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuFormComponent } from './admin-menu-form.component';

describe('AdminMenuFormComponent', () => {
  let component: AdminMenuFormComponent;
  let fixture: ComponentFixture<AdminMenuFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMenuFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMenuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
