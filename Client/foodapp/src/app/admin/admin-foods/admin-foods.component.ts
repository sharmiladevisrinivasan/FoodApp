import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food';
import { FoodService } from 'src/app/service/food.service';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/service/restaurants.service';

@Component({
  selector: 'app-admin-foods',
  templateUrl: './admin-foods.component.html',
  styleUrls: ['./admin-foods.component.css'],
  providers: [FoodService],
})
export class AdminFoodsComponent implements OnInit {
  restaurantService: RestaurantService;
  searchString: string;

  constructor(
    private foodService: FoodService,
    private router: Router,
    restaurantService: RestaurantService
  ) {}
  foods: Food[];
  food: Food;
  Name: string;
  Description: string;
  Cuisine: string;
  foodImage: string;
  Price: number;
  restaurant: number;
  Quantity: number;
  user: number;

  getFoods() {
    this.foodService.getAdminFoods().subscribe((foods) => {
      this.foods = foods;
    });
  }

  ngOnInit() {
    this.getFoods();
  }
  deleteFood(foodId) {
    console.log(foodId);
    if (confirm('Are you sure you want to delete this food?')) {
      this.foodService.deleteFood(foodId).subscribe((res) => {
        console.log(res);
        this.getFoods();
      });
    }
  }
}
