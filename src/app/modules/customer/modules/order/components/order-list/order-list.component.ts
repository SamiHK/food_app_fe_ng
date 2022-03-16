import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/modules/customer/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  orders?: Order[]
  statusNav: {
    status: string
    total: number
  }[] = [
      { status: 'All', total: 0 }
    ]


  ngOnInit(): void {
    this.route.params.forEach((p: Params) => {
      console.log(p)
      console.log(p['status'])
      this.orderService.get(p['status']).forEach(r => {
        this.statusNav = r.orderStatus
        this.orders = r.orders;
      })
    })
  }

}
