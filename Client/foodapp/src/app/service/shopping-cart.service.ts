import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../config/config';
import { BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class ShoppingCartService {
  // tslint:disable-next-line: variable-name
  _foods = [];
  // tslint:disable-next-line: variable-name
  _cart = [];
  foodsSub;
  cartSub;
  constructor(private http: HttpClient) {
    this.foodsSub = new BehaviorSubject<any[]>(this._foods);
    this.cartSub = new BehaviorSubject<any[]>(this._cart);
  }
  checkout(data) {
    return this.http.post(baseUrl + 'checkout', data);
  }

  placeOrder(orderDetails) {
    return this.http.post(baseUrl + 'orders', orderDetails).pipe(
      tap((order) => console.log(order)),
      map((res) => res)
    );
  }
}
