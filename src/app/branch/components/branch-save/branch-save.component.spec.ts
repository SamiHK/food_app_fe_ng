import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchSaveComponent } from './branch-save.component';

describe('BranchSaveComponent', () => {
  let component: BranchSaveComponent;
  let fixture: ComponentFixture<BranchSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
