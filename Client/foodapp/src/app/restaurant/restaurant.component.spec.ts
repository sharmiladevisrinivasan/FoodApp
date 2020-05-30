import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantComponent } from './restaurant.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RestaurantService } from '../service/restaurants.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from '../pipes/filter.pipe';
import { UserService } from '../service/user.service';

// describe('Pipe: filter', () => {
//   let pipe: FilterPipe;

//   beforeEach(() => {
//     pipe = new FilterPipe();
//   });
// });
// it('show 3 dot when string length is grater ther 15 chartacter', () => {
//   expect(pipe.transform('my name is vikram sharma', '15')).toBe('my name is vikr...');
// });

// it('show full string when string length is less then 15 character', () => {
//   expect(pipe.transform('my name is vikram sharma', '200')).toBe('my name is vikram sharma');
// });
// });

describe('RestaurantComponent', () => {
  let component: RestaurantComponent;
  let fixture: ComponentFixture<RestaurantComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantComponent,
      FilterPipe ],
      imports : [
        RouterTestingModule,
        NgbModule,
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule],
        providers: [RestaurantService, UserService],
      })

    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

