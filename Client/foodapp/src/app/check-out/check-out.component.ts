import { Component, OnInit } from '@angular/core';
import { Food } from '../models/food';
import { baseUrl } from '../config/config';
import { FoodService } from '../service/food.service';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/_alert/alert.service';
import { RestaurantService } from '../service/restaurants.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  checkoutForm: FormGroup;
  defaultQuantity = 1;
  foodAddedToCart: Food[];
  allTotal: number;
  baseUrl = baseUrl;
  food: Food[];
  uniqueRestaurantId;
  checkoutFormInputs;
  showPaymentGateway = false;
  items = [];
  alert: any;
  // tslint:disable-next-line: no-shadowed-variable
  constructor(
    private foodService: FoodService,
    restaurantService: RestaurantService,
    protected alertService: AlertService,
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) {}
  ngOnInit() {
    this.checkoutForm = new FormGroup({
      Name: new FormControl(null, Validators.required),
      address1: new FormControl(null, Validators.required),
      address2: new FormControl(null, Validators.required),
      Country: new FormControl(null, Validators.required),
      State: new FormControl(null, Validators.required),
      Zip: new FormControl(null, Validators.required),
      Phone: new FormControl(null, Validators.required),
    });
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

  calculateAllTotal(allItems: Food[]) {
    let total = 0;
    // tslint:disable-next-line: forin
    for (const i in allItems) {
      total = Math.round(total + allItems[i].Quantity * allItems[i].Price);
    }
    this.allTotal = total;
  }

  saveOrder(paymentObj) {
    console.log(paymentObj);
    this.uniqueRestaurantId = this.getFoodFromCart()[0].restaurant;
    const items = this.items;
    const orderDetails = {
      order: {
        deliveryAddress: {
          Name: this.checkoutFormInputs.Name,
          address1: this.checkoutFormInputs.address1,
          address2: this.checkoutFormInputs.address2,
          Country: this.checkoutFormInputs.Country,
          State: this.checkoutFormInputs.State,
          Zip: this.checkoutFormInputs.Zip,
          Phone: this.checkoutFormInputs.Phone,
        },
        restaurantId: this.uniqueRestaurantId,
        items,
        carttotalPrice: this.allTotal,
        paymentId: paymentObj,
      },
    };
    this.shoppingCartService.placeOrder(orderDetails).subscribe((res) => {
      console.log(res);

      this.checkoutForm.reset();
      this.router.navigate(['/my/orders']);
    });
  }
  onSubmit() {
    if (this.checkoutForm.valid) {
      this.checkoutFormInputs = this.checkoutForm.value;

      const restaurantIds = [];
      for (const item of this.getFoodFromCart()) {
        console.log(item);
        // tslint:disable-next-line: no-string-literal
        item['itemtotalprice'] = item['Quantity'] * item['Price'];
        this.items.push(item);
        // tslint:disable-next-line: no-string-literal
        if (restaurantIds.indexOf(item['restaurant']) === -1) {
          // tslint:disable-next-line: no-string-literal
          restaurantIds.push(item['restaurant']);
        }
      }
      if (restaurantIds.length > 1) {
        this.alertService.error(
          'Your order conatins items from multiple restauants.Kindly pick one Restaurant to place an order'
        );
        return false;
      }
      this.showPaymentGateway = true;
    } else {
      this.alertService.error('Invalid Form Input, Please Check before Submit');
    }
  }
}
