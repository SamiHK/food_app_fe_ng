import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListItemCardComponent } from './order-list-item-card.component';

describe('OrderListItemCardComponent', () => {
  let component: OrderListItemCardComponent;
  let fixture: ComponentFixture<OrderListItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderListItemCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
