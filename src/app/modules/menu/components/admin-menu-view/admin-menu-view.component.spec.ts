import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuViewComponent } from './admin-menu-view.component';

describe('AdminMenuViewComponent', () => {
  let component: AdminMenuViewComponent;
  let fixture: ComponentFixture<AdminMenuViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMenuViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMenuViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
