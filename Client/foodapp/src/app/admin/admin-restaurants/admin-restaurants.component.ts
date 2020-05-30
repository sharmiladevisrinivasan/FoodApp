import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/service/restaurants.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin-restaurants',
  templateUrl: './admin-restaurants.component.html',
  styleUrls: ['./admin-restaurants.component.css'],
  providers: [RestaurantService],
})
export class AdminRestaurantsComponent implements OnInit {
  restaurants: Restaurant[];
  restaurant: Restaurant;
  // tslint:disable-next-line: variable-name
  Name_of_the_Restaurant: string;
  Cuisine: string;
  restaurantImage: string;
  // tslint:disable-next-line: variable-name
  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private userService: UserService
  ) {}
  getRestaurants() {
    this.restaurantService.getAdminRestaurants().subscribe((restaurants) => {
      this.restaurants = restaurants;
    });
  }

  ngOnInit() {
    this.userService.updateUserName(false);
    this.getRestaurants();
  }
  deleteRestaurant(resId) {
    console.log(resId);
    if (confirm('Are you sure you want to delete this restaurant?')) {
      this.restaurantService.deleteRestaurant(resId).subscribe((res) => {
        console.log(res);
        this.getRestaurants();
      });
    }
  }
}
