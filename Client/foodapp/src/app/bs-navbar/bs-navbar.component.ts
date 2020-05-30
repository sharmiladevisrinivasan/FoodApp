import { Component, OnInit } from '@angular/core';
import { FoodService } from '../service/food.service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_alert/alert.service';
import { AuthGuard } from '../auth/auth-guard.service';

const options = {
  autoClose: true,
  keepAfterRouteChange: true,
};

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent implements OnInit {
  navbarOpen = false;
  // tslint:disable-next-line: ban-types
  foodCount: Number;
  UserName: string;

  logout() {
    this.userService.logout().subscribe((res) => {
      if (res.status) {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userProfile');
        localStorage.removeItem('food');

        this.userService.updateUserName(true);
        this.router.navigate(['/restaurants']);
        this.alertService.info('Logged Out!!', options);
      }
    });
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  constructor(
    private foodService: FoodService,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService,
    public authGuard: AuthGuard
  ) {}

  ngOnInit() {
    this.userService.updateUserName(false);
    this.foodService.foodCount$.subscribe((count) => (this.foodCount = count));
    this.userService.UserName$.subscribe((Email) => {
      console.log(Email);
      return (this.UserName = Email);
    });
  }
}
