import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Food } from 'src/app/models/food';
import { FoodService } from 'src/app/service/food.service';
import { baseUrl } from 'src/app/config/config';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'food-quantity',
  templateUrl: './food-quantity.component.html',
  styleUrls: ['./food-quantity.component.css']
})
export class FoodQuantityComponent implements OnInit {
    // tslint:disable-next-line: no-input-rename
  @Input('food') food: Food;
    // tslint:disable-next-line: no-input-rename
  @Input('foodItems') foodItems;
  @Output() private removeFood = new EventEmitter();

  defaultQuantity = 1;
  allTotal: number;
  foodAddedToCart: Food [];
  baseUrl = baseUrl;
  constructor(private foodService: FoodService) { }

  ngOnInit() {
    console.log(this.food.Quantity);
    this.food.Quantity = this.foodService.foodAlreadyExist(this.food).Quantity;
    console.log(this.food.Quantity);
  }

  onAddQuantity(food: Food) {
    food.Quantity = food.Quantity + 1;
    this.foodAddedToCart = this.getFoodFromCart();
    this.foodAddedToCart.find(f => f._id === food._id).Quantity = food.Quantity;
    this.saveToCart(this.foodAddedToCart);
    this.calculateAllTotal(this.foodAddedToCart);

  }

  onRemoveQuantity( food: Food ) {
    food.Quantity = food.Quantity - 1;
    if (food.Quantity === 0) {
      this.removeFood.emit(food._id);
  }

    this.foodAddedToCart = this.getFoodFromCart();
    this.foodAddedToCart.find( f => f._id === food._id).Quantity = food.Quantity ;
    this.foodAddedToCart = this.foodAddedToCart.filter(f => f.Quantity > 0);
    this.saveToCart(this.foodAddedToCart);
    this.calculateAllTotal(this.foodAddedToCart);
  }
  saveToCart(foods: any) {
    console.log(foods);
    this.foodService.addFoodToCart(foods);
  }

  getFoodFromCart() {
    return this.foodService.getFoodFromCart();
  }

  calculateAllTotal(allItems: Food[]) {
    let total = 0;
    // tslint:disable-next-line: forin
    for ( const i in allItems) {
      total = total + (allItems[i].Quantity * allItems[i].Price) ;
    }
    this.allTotal = total;
    this.foodService.updateCartCount(allItems.length);
  }
}
