import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RestaurantService } from '../../service/restaurants.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from '../../pipes/filter.pipe';
import { UserService } from '../../service/user.service';
import { FoodService } from 'src/app/service/food.service';

import { AdminFoodsComponent } from './admin-foods.component';

describe('AdminFoodsComponent', () => {
  let component: AdminFoodsComponent;
  let fixture: ComponentFixture<AdminFoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFoodsComponent, FilterPipe],
      imports: [
        RouterTestingModule,
        NgbModule,
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      providers: [RestaurantService, UserService, FoodService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
