import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';
import { Page } from 'src/app/models/page';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  page = new Page<Order>();
  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    this.route.queryParams.forEach(queryParams => {
      console.log(queryParams)
      if(queryParams['salespersonId']){
        this.salespersonId = queryParams['salespersonId']
      }
      this.loadOrders(1)
    })
  }

  isLoading = false;
  salespersonId?: String
  status?: String
  async loadOrders(page?: number){
    this.isLoading = true;
    let params: {
      page?: number, salespersonId?: String
    } = {
      page: page,
    }
    if(this.salespersonId){
      params.salespersonId = this.salespersonId
    }
    await this.orderService.search(params).forEach(r => this.page = r);
    this.isLoading = false;
  }

  onPageChange(event: any){
    this.loadOrders(event.page)
  }

}
