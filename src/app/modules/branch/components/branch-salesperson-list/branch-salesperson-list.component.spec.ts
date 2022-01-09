import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchSalespersonListComponent } from './branch-salesperson-list.component';

describe('BranchSalespersonListComponent', () => {
  let component: BranchSalespersonListComponent;
  let fixture: ComponentFixture<BranchSalespersonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchSalespersonListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchSalespersonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
