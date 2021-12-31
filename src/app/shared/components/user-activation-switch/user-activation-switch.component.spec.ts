import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActivationSwitchComponent } from './user-activation-switch.component';

describe('UserActivationSwitchComponent', () => {
  let component: UserActivationSwitchComponent;
  let fixture: ComponentFixture<UserActivationSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserActivationSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActivationSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
