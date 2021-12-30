import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputErrorHelperComponent } from './input-error-helper.component';

describe('InputErrorHelperComponent', () => {
  let component: InputErrorHelperComponent;
  let fixture: ComponentFixture<InputErrorHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputErrorHelperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputErrorHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
