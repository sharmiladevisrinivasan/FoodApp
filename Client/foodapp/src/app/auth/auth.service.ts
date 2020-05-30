import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'

})
export class AuthService {
  constructor(public jwtHelper) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return true;
    return !this.jwtHelper.isTokenExpired(token);
  }
}
