import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RestaurantService } from '../../service/restaurants.service';
import { RestaurantFoodComponent } from './restaurant-food.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../service/user.service';
import { FoodQuantityComponent } from '../../shared/components/food-quantity/food-quantity.component';



describe('RestaurantFoodComponent', () => {
  let component: RestaurantFoodComponent;
  let fixture: ComponentFixture<RestaurantFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantFoodComponent, FoodQuantityComponent ],
      imports : [
        RouterTestingModule,
        NgbModule,
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule],
        providers: [RestaurantService, UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
