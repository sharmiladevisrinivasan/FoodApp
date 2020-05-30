import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FoodService } from "src/app/service/food.service";
import { FormGroup, Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { baseUrl } from "../../config/config";
import { AlertService } from "src/app/_alert/alert.service";
import { RestaurantService } from "src/app/service/restaurants.service";
import { ActivatedRoute } from "@angular/router";

const options = {
  autoClose: true,
  keepAfterRouteChange: true,
};
@Component({
  selector: "app-foods-form",
  templateUrl: "./foods-form.component.html",
  styleUrls: ["./foods-form.component.css"],
})
export class FoodsFormComponent implements OnInit {
  foodForm: FormGroup;
  food;
  Name: "";
  Description: "";
  id;
  imgPreview;
  submitted = false;
  baseUrl = baseUrl;
  image;
  Cuisine: any = [
    "Chinese",
    "Japanese",
    "American",
    "Indian",
    "French",
    "Thai",
    "Mediterranean",
    "Mexican",
    "Italian",
    "Greek",
  ];

  restaurants: any;

  public globalResponse: any;
  setValue: any;
  // tslint:disable-next-line: max-line-length
  constructor(
    private foodService: FoodService,
    private http: HttpClient,
    protected alertService: AlertService,
    private router: Router,
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.restaurants = this.restaurantService
      .getAdminRestaurants()
      .subscribe((restaurants) => (this.restaurants = restaurants));

    this.foodForm = new FormGroup({
      Name: new FormControl(null, Validators.required),
      Description: new FormControl(null, Validators.required),
      Cuisine: new FormControl(null, Validators.required),
      restaurant: new FormControl(null, Validators.required),
      Quantity: new FormControl(null, Validators.required),
      Price: new FormControl(null, Validators.required),
      foodImage: new FormControl(null),
    });

    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.foodService.getFood(this.id).subscribe((r) => {
        this.food = r;
        this.imgPreview = this.food.foodImage;
        this.food.foodImage = "";
        console.log(this.food);
        return;
      });
    } else {
      this.foodForm.get("foodImage").setValidators([Validators.required]);
    }
  }

  onFileChange(event) {
    const file = event.target.files[0];
    this.image = file;
    if (this.id) {
      this.foodForm.get("foodImage").setValidators([Validators.required]);
    }
  }

  get foodFormControls(): any {
    // tslint:disable-next-line: no-string-literal
    return this.foodForm["controls"];
  }

  onSubmit() {
    this.submitted = true;

    if (this.foodForm.valid) {
      const foodFormInputs = this.foodForm.value;
      console.log(foodFormInputs, this.foodForm.controls);
      const formData = new FormData();
      Object.keys(foodFormInputs).forEach((element) => {
        formData.append(element, foodFormInputs[element]);
      });

      formData.set("foodImage", this.image);
      if (this.id && formData.get("foodImage") === (undefined || "undefined")) {
        formData.delete("foodImage");
      }
      if (this.food && this.food._id) {
        this.foodService
          .updateFood(formData, this.food._id)
          .subscribe((result) => {
            // tslint:disable-next-line: no-string-literal
            if (result["error"]) {
              // tslint:disable-next-line: no-string-literal
              this.alertService.error(result["error"], options);
              return false;
            }
            this.globalResponse = result;
            this.foodForm.reset();
            setTimeout(() => {
              // tslint:disable-next-line: no-string-literal
              this.alertService.success(result["message"], options);
            }, 1000);

            this.router.navigate(["admin/foods"]);
          });
      } else {
        this.foodService.addFood(formData).subscribe((result) => {
          // tslint:disable-next-line: no-string-literal
          if (result["error"]) {
            // tslint:disable-next-line: no-string-literal
            this.alertService.error(result["error"], options);
            return false;
          }
          this.globalResponse = result;
          this.foodForm.reset();

          setTimeout(() => {
            // tslint:disable-next-line: no-string-literal
            this.alertService.success(result["message"], options);
          }, 1000);

          this.router.navigate(["admin/foods"]);
        });
      }
      console.log("Form Submitted");
    }
  }
}
