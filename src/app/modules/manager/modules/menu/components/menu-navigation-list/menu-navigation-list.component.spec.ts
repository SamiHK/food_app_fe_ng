import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuNavigationListComponent } from './menu-navigation-list.component';

describe('MenuNavigationListComponent', () => {
  let component: MenuNavigationListComponent;
  let fixture: ComponentFixture<MenuNavigationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuNavigationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuNavigationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
