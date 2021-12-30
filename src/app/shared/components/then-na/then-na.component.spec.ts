import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThenNaComponent } from './then-na.component';

describe('ThenNaComponent', () => {
  let component: ThenNaComponent;
  let fixture: ComponentFixture<ThenNaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThenNaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThenNaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
