import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Food } from '../models/food';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { baseUrl, baseUri } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private foodCountSubject = new BehaviorSubject<number>(
    this.getFoodFromCart().length
  );
  foodCount$ = this.foodCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  // To get Food details based on ID - used to edit food in food form
  getFood(foodId) {
    return this.http.get(baseUrl + 'food/' + foodId).pipe(
      tap((food: Food) => console.log(food)),

      // tslint:disable-next-line: no-string-literal
      map((res) => res['food'])
    );
  }

  // To retrieve foods based on the restaurant

  getAdminFoods() {
    return this.http.get<any>(baseUrl + 'food/merchant').pipe(
      tap((food) => console.log(food)),
      map((res) => res.food)
    );
  }
  // To display foods based on the restaurant
  getFoodsByRestaurant(resId) {
    return this.http.get<Food[]>(baseUri + resId).pipe(
      tap((food: Food[]) => console.log(food)),
      map((res) => res),
      catchError(this.handleError)
    );
  }

  // Update Restaurant
  updateFood(food, foodId) {
    return this.http.patch(baseUrl + 'food/' + foodId, food).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      tap((food: Food) => console.log(food))
    );
    map((res) => res);
  }

  // add food method

  addFood(newFood) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(baseUrl + 'food/new', newFood).pipe(
      tap((food: Food) => console.log(food)),
      map((res) => res)
    );
  }

  // delete method
  deleteFood(id) {
    return this.http.delete(baseUrl + 'food/' + id).pipe(
      tap((food: Food) => console.log(food)),
      map((res) => res)
    );
  }

  addFoodToCart(foods: any) {
    console.log(JSON.stringify(foods));
    localStorage.setItem('food', JSON.stringify(foods));
  }

  getFoodFromCart() {
    return JSON.parse(localStorage.getItem('food')) || [];
  }

  foodAlreadyExist(food) {
    if (this.getFoodFromCart().length > 0) {
      // tslint:disable-next-line: triple-equals
      return this.getFoodFromCart().find((f) => f._id == food._id);
    } else {
      return false;
    }
  }

  removeAllFoodFromCart() {
    localStorage.removeItem('food');
    this.foodCountSubject.next(0);
    return;
  }

  updateCartCount(count) {
    this.foodCountSubject.next(count);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
