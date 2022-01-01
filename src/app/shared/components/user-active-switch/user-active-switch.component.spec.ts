import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActiveSwitchComponent } from './user-active-switch.component';

describe('UserActiveSwitchComponent', () => {
  let component: UserActiveSwitchComponent;
  let fixture: ComponentFixture<UserActiveSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserActiveSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActiveSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
