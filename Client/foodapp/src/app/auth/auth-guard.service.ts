import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

import { UserService } from '../service/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: UserService,
        private activatedRoute: ActivatedRoute
    ) { }


    isLogged() {
      const currentUser = this.authenticationService.getUserProfile();
      // tslint:disable-next-line: no-string-literal
      if (currentUser['UserName']) {
      return true;
      } else {
      return false;
      }
    }

    isMerchant() {
      const currentUser = this.authenticationService.getUserProfile();
      // tslint:disable-next-line: no-string-literal
      if (currentUser['UserName']) {
        // tslint:disable-next-line: no-string-literal
        if (currentUser['UserType'] === 'Merchant') {
        return true;
        } else {
        return false;
        }
      }

      return false;

    }

    isCustomer() {
      const currentUser = this.authenticationService.getUserProfile();
      // tslint:disable-next-line: no-string-literal
      if (currentUser['UserName']) {
        // tslint:disable-next-line: no-string-literal
        if (currentUser['UserType'] === 'Customer') {
        return true;
        } else {
        return false;
        }
      }

      return false;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.getUserProfile();

        // tslint:disable-next-line: no-string-literal
        if (currentUser['UserName']) {
            // check if route is restricted by role
            // tslint:disable-next-line: no-string-literal
            if (route.data.roles && route.data.roles.indexOf(currentUser['UserType']) === -1) {

               // tslint:disable-next-line: no-string-literal
               if (currentUser['UserType'] === 'Merchant') {
                 console.log('1');
                 this.router.navigate(['/admin/']);
                 return false;
              }
               console.log('2');
                // role not authorised so redirect to home page
               this.router.navigate(['/']);
               return false;
            }

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
