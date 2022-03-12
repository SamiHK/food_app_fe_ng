import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/modules/customer/services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  order?: Order
  ngOnInit(): void {
    this.route.params.forEach((p: Params) => {
      // console.log(p)
      if(p['id']){
        this.orderService.getById(p['id']).subscribe(o => this.order = o)
      }
    })
  }

}
