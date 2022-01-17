import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalespersonViewComponent } from './salesperson-view.component';

describe('SalespersonViewComponent', () => {
  let component: SalespersonViewComponent;
  let fixture: ComponentFixture<SalespersonViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalespersonViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalespersonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
