import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RestaurantService } from '../../service/restaurants.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../service/user.service';

import { FoodsFormComponent } from './foods-form.component';

describe('FoodsFormComponent', () => {
  let component: FoodsFormComponent;
  let fixture: ComponentFixture<FoodsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FoodsFormComponent],
      imports: [
        RouterTestingModule,
        NgbModule,
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      providers: [RestaurantService, UserService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
