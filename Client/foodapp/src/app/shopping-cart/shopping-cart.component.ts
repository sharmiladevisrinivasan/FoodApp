import { Component, OnInit } from '@angular/core';
import { Food } from '../models/food';
import { FoodService } from 'src/app/service/food.service';
import { baseUrl } from '../config/config';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})

export class ShoppingCartComponent implements OnInit {
  defaultQuantity = 1;
  foodAddedToCart: Food[];
  allTotal: number;
  baseUrl = baseUrl;
  food: Food[];
  constructor(private foodService: FoodService) { }


  ngOnInit() {
    this.foodAddedToCart = this.getFoodFromCart();
    // tslint:disable-next-line: forin
    for (const i in this.foodAddedToCart) {
      if (!this.foodAddedToCart[i].Quantity) {
       this.foodAddedToCart[i].Quantity = 1;
      }
    }
    this.calculateAllTotal(this.foodAddedToCart);
  }

  getFoodFromCart() {
    return this.foodService.getFoodFromCart();
  }

  removeFood(foodId) {
    console.log('before', this.foodAddedToCart);
    this.foodAddedToCart = this.foodAddedToCart.filter((f) => f._id !== foodId);
    console.log('after', this.foodAddedToCart);

  }

  removeAllFoodFromCart() {
    this.foodAddedToCart = [];
    this.foodService.removeAllFoodFromCart();
  }

  calculateAllTotal(allItems: Food[]) {
    let total = 0;
    // tslint:disable-next-line: forin
    for ( const i in allItems) {
      total = Math.round(total + (allItems[i].Quantity * allItems[i].Price));
    }
    this.allTotal = total;
  }
}
