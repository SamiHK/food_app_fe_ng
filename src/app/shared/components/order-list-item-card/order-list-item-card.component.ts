import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-order-list-item-card',
  templateUrl: './order-list-item-card.component.html',
  styleUrls: ['./order-list-item-card.component.scss']
})
export class OrderListItemCardComponent implements OnInit {


  @Input('cart')
  order?: Order

  constructor() { }

  ngOnInit(): void {
  }

}
