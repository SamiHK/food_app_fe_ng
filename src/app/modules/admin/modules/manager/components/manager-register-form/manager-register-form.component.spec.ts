import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRegisterFormComponent } from './manager-register-form.component';

describe('ManagerRegisterFormComponent', () => {
  let component: ManagerRegisterFormComponent;
  let fixture: ComponentFixture<ManagerRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerRegisterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
