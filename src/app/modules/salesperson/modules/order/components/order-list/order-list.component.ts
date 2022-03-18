import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Order, OrderStatus } from 'src/app/models/order';
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

  changingStatus = false;
  async changeStatus(orderId?: number, status?: String){
    // console.log(orderId);
    // console.log(status);
    if(orderId && status){
      if(status == OrderStatus.PENDING){
        status = OrderStatus.ACCEPTED;
      } else if(status == OrderStatus.ACCEPTED){
        status = OrderStatus.IN_PROGRESS;
      } else if(status == OrderStatus.IN_PROGRESS){
        status = OrderStatus.DISPATCHED
      }
      this.changingStatus = true;
      await this.orderService.changeStatus(orderId, status).forEach(o => console.log(o))
      // this.page.items = this.page.items.filter(i => i.id != orderId) 
      this.changingStatus = false;
      this.loadOrders(this.page.number, this.status)
    }
  }

  orderCancel(orderId?: number){
    this.changeStatus(orderId, OrderStatus.CANCELED)
  }

}
