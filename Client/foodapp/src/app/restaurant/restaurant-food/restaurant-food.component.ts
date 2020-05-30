import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/service/food.service';
import { Food } from 'src/app/models/food';
import { baseUrl } from '../../config/config';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-restaurant-food',
  templateUrl: './restaurant-food.component.html',
  styleUrls: ['./restaurant-food.component.css'],

})
export class RestaurantFoodComponent implements OnInit {
  foods: Food[];
  resId: string;
  baseUrl = baseUrl;
  foodAddedToCart: any;
  cartItemCount: any;

constructor(private route: ActivatedRoute, public foodService: FoodService, private shoppingCartService: ShoppingCartService ) {

   }

ngOnInit() {

       this.resId = this.route.snapshot.paramMap.get('resId');
       this.foodService.getFoodsByRestaurant(this.resId).subscribe( foods => {
        this.foods = foods;
      },
      error => {
        console.log(error);
      });
  }


OnAddCart(food: Food) {
  console.log(food);
  this.foodAddedToCart = this.foodService.getFoodFromCart();
  if (this.foodAddedToCart == null) {
    console.log(food);
    this.foodAddedToCart = [];
    food.Quantity = 1;
    this.foodAddedToCart.push(food);
    this.foodService.addFoodToCart(this.foodAddedToCart);
  } else {

    console.log(this.foodAddedToCart);
    const tempFood = this.foodAddedToCart.find(f => f._id === food._id);
    if (tempFood == null) {
      food.Quantity = 1;
      this.foodAddedToCart.push(food);
      this.foodService.addFoodToCart(this.foodAddedToCart);
    }
  }
  this.cartItemCount = this.foodAddedToCart.length;
  this.foodService.updateCartCount(this.cartItemCount);
}
}
