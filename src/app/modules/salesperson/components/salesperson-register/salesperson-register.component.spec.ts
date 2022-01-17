import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalespersonRegisterComponent } from './salesperson-register.component';

describe('SalespersonRegisterComponent', () => {
  let component: SalespersonRegisterComponent;
  let fixture: ComponentFixture<SalespersonRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalespersonRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalespersonRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
