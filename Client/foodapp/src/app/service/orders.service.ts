import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {baseUrl } from '../config/config';
import { Order } from '../models/order';


@Injectable({
  providedIn: 'root'
})

export class OrderService {

 constructor(private http: HttpClient) {}


getMerchantOrders() {
  return this.http.get<Order[]>( baseUrl + 'orders/manageOrders' )
  .pipe(
    tap((order: Order[]) => console.log(order)),
  // tslint:disable-next-line: no-string-literal
  map(res => res['order'])
  );
}

getMyOrders() {
  return this.http.get<Order[]>( baseUrl + 'orders/myOrders')
  .pipe(
    tap((order: Order[]) => console.log(order)),
  // tslint:disable-next-line: no-string-literal
  map(res => res['order'])
  );

}

deleteOrder(id) {
  return  this.http.delete(baseUrl + 'orders/' + id)
  .pipe(
    tap((order: Order) => console.log(order)),
  map(res => res)
  );
}


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
