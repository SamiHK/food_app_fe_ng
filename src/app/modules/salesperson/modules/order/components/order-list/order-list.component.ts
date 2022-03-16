import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Order } from 'src/app/models/order';
import { Page } from 'src/app/models/page';
import { OrderService } from 'src/app/modules/salesperson/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }
  page: Page<Order> = new Page()
  statusNav: {
    status: string
    total: number
  }[] = [
      { status: 'All', total: 0 }
    ]


  ngOnInit(): void {
    this.route.params.forEach((p: Params) => {
      this.loadOrders(1, p['status'])
    })
  }

  isLoading = false;
  status?: string;
  async loadOrders(page?: number, status?: string) {
    this.isLoading = true;
    this.status = status;
    await this.orderService.get(this.status, page).forEach(r => {
      this.statusNav = r.orderStatus
      this.page = r.page;
    })
    this.isLoading = false;
  }

  onPageChange(event: any) {
    this.loadOrders(event.page, this.status)
  }

}
