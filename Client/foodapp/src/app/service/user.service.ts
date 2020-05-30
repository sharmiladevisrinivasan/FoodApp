import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { baseUrl } from '../config/config';
import { tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'jwt-token',
  }),
};

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private UserNamedisplaySubject = new BehaviorSubject<string>(
    this.getUserProfile().UserName
  );
  UserName$ = this.UserNamedisplaySubject.asObservable();

  constructor(private http: HttpClient) {}

  // retrieving UserService

  login(data) {
    return this.http
      .post(baseUrl + 'users/login', data)
      .pipe(tap((user: any) => console.log(user)));
    map((res) => res);
  }

  logout() {
    return this.http
      .post(baseUrl + 'users/logout', {})
      .pipe(tap((user: any) => console.log(user)));
    map((res) => res);
  }

  signup(data) {
    return this.http
      .post(baseUrl + 'users/signup', data)
      .pipe(tap((user: any) => console.log(user)));
    map((res) => res);
  }

  getUserProfile() {
    if (localStorage.getItem('userProfile')) {
      return JSON.parse(localStorage.getItem('userProfile'));
    } else {
      return { UserName: '' };
    }
  }

  emailCheckUnique(email) {
    return this.http.get(baseUrl + 'users/email/' + email);
  }

  updateUserName(reset = false) {
    console.log(this.getUserProfile().UserName, reset);
    if (reset) {
      this.UserNamedisplaySubject.next('');
    } else {
      const tmpUserName = this.getUserProfile().UserName;
      console.log(tmpUserName);
      this.UserNamedisplaySubject.next(tmpUserName);
    }
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
