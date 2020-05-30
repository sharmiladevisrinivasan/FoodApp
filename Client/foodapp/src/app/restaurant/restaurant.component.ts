import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../service/restaurants.service';
import { Restaurant } from '../models/restaurant';
import {baseUrl} from '../config/config';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
  providers: [RestaurantService]
})
export class RestaurantComponent implements OnInit {
  restaurants: Restaurant[];
  restaurant: Restaurant;
  // tslint:disable-next-line: variable-name
  Name_of_the_Restaurant: string;
  Cuisine: string;
  restaurantImage: string;
  baseUrl = baseUrl;
  searchString: string;
  constructor(private restaurantService: RestaurantService, private userService: UserService) {   }

  ngOnInit() {
    this.userService.updateUserName(false);
    this.restaurantService.getRestaurants()
    .subscribe( restaurants => {
        console.log(restaurants);
        this.restaurants = restaurants;
      });
    }
}
