import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthErrorModalComponent } from './auth-error-modal.component';

describe('AuthErrorModalComponent', () => {
  let component: AuthErrorModalComponent;
  let fixture: ComponentFixture<AuthErrorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthErrorModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
