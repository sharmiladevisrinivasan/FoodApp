import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { HttpClientModule,  HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertModule } from './_alert';


import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { AdminFoodsComponent } from './admin/admin-foods/admin-foods.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminRestaurantsComponent } from './admin/admin-restaurants/admin-restaurants.component';
import { FoodsFormComponent } from './admin/foods-form/foods-form.component';
import { RestaurantFormComponent } from './admin/restaurant-form/restaurant-form.component';
import { RestaurantFoodComponent } from './restaurant/restaurant-food/restaurant-food.component';
import { FoodQuantityComponent } from '../app/shared/components/food-quantity/food-quantity.component';
import { SignupComponent } from './signup/signup.component';
import { PaymeComponent } from './payme/payme.component';


import { FoodService } from './service/food.service';
import { UserService } from './service/user.service';
import { OrderService } from './service/orders.service';
import { RestaurantService } from './service/restaurants.service';
import { ShoppingCartService } from './service/shopping-cart.service';

import { AuthGuard } from './auth/auth-guard.service';
import { FilterPipe } from './pipes/filter.pipe';
import { TokenInterceptor } from './core/http/tokenInterceptor';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
    MyOrdersComponent,
    OrderSuccessComponent,
    RestaurantComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    AdminFoodsComponent,
    AdminOrdersComponent,
    AdminRestaurantsComponent,
    FoodsFormComponent,
    RestaurantFormComponent,
    RestaurantFoodComponent,
    FoodQuantityComponent,
    SignupComponent,
    PaymeComponent,
    FilterPipe
    ],
  imports: [
    BrowserModule,
    NgxSpinnerModule,
    NgbModule,
    AlertModule,
    FormsModule,
    CustomFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'restaurants', canActivate: [AuthGuard],
      data: { roles: ['Customer']  },
      children: [
          { path: '', component: RestaurantComponent },
          { path: ':resId', component: RestaurantFoodComponent },
      ] },
      { path: 'shopping-cart', component: ShoppingCartComponent , canActivate: [AuthGuard],
      data: { roles: ['Customer']}},
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard],
      data: { roles: ['Customer'] }},
      { path: 'order-success', component: OrderSuccessComponent },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard],
      data: { roles: ['Customer']  }},
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent},

      {path: 'admin', canActivate: [AuthGuard],
      data: { roles: ['Merchant'] },
        children: [
          {path:  'foods/new', component: FoodsFormComponent },
          { path: 'foods/:id', component: FoodsFormComponent },
          { path: 'foods', component: AdminFoodsComponent },
          { path: 'orders', component: AdminOrdersComponent },
          { path: 'restaurants', component: AdminRestaurantsComponent},
          { path: 'restaurants/new', component: RestaurantFormComponent },
          { path: 'restaurants/:id', component: RestaurantFormComponent},
          { path: '', redirectTo: '/admin/restaurants', pathMatch: 'full' }
          ]},
      { path: '', redirectTo: 'restaurants', pathMatch: 'full' }

    ], { useHash: true })

  ],

  exports: [
    FilterPipe
  ],
  providers: [
    FoodService,
    UserService,
    OrderService,
    RestaurantService,
    ShoppingCartService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
