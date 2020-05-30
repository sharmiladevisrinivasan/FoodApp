import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Restaurant } from '../models/restaurant';
import { throwError } from 'rxjs';
import { map , tap } from 'rxjs/operators';
import {baseUrl} from '../config/config';



@Injectable()

export class RestaurantService {

  constructor(private http: HttpClient) {}

  // retrieving RestaurantService

   getRestaurant(restaurantId) {
    return  this.http.get(baseUrl + 'restaurant/' + restaurantId)
    .pipe(
      tap((restaurant: Restaurant) => console.log(restaurant) ),
    // tslint:disable-next-line: no-string-literal
    map(res => res['restaurant'])
    ); }


  getRestaurants() {
    return this.http.get<any>(baseUrl + 'restaurant')
    .pipe(
      tap((restaurant) => console.log(restaurant)),
    map(res => res.restaurant));
  }

  getAdminRestaurants() {
    return this.http.get<Restaurant[]>(baseUrl + 'restaurant/merchant')
    .pipe(
      tap((restaurant: Restaurant[]) => console.log(restaurant)));
    map(res => res);
  }

  // Update Restaurant
   updateRestaurant(restaurant, restaurantId) {
      return this.http.patch(baseUrl + 'restaurant/' + restaurantId, restaurant)
    .pipe(
      // tslint:disable-next-line: no-shadowed-variable
      tap((restaurant: Restaurant) => console.log(restaurant) ));
      map(res => res);
   }


  // add restaurant method
  addRestaurant(newRestaurant) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // tslint:disable-next-line: new-parens
    return this.http.post(baseUrl + 'restaurant/new', newRestaurant)
    .pipe(
      tap((restaurant: Restaurant) => console.log(restaurant) ));
    map(res => res);
  }
  // delete method
  deleteRestaurant(id) {
    return  this.http.delete(baseUrl + 'restaurant/' + id)
    .pipe(
      tap((restaurant: Restaurant) => console.log(restaurant) ));
    map(res => res);
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
