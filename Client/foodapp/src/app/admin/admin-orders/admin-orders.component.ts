import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/orders.service';
import { Order } from 'src/app/models/order';
import { baseUrl } from 'src/app/config/config';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
   orders: Order[];
   order: Order;
   orderDetails: [];
  baseUrl: any;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.baseUrl = baseUrl;
    this.orderService.getMerchantOrders()
    .subscribe( orders => {
      this.orders = orders;
      console.log(this.orders);
    });
  }
}
