import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RestaurantService } from "src/app/service/restaurants.service";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { baseUrl } from "../../config/config";
import { AlertService } from "src/app/_alert";

const options = {
  autoClose: false,
  keepAfterRouteChange: true,
};

@Component({
  selector: "app-restaurant-form",
  templateUrl: "./restaurant-form.component.html",
  styleUrls: ["./restaurant-form.component.css"],
})
export class RestaurantFormComponent implements OnInit {
  restaurantForm: FormGroup;
  restaurants: any;
  image;
  id;
  imgPreview;
  restaurant;
  submitted = false;
  // tslint:disable-next-line: variable-name
  Name_of_the_Restaurant: "";
  baseUrl = baseUrl;
  setValue: any;
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
  public globalResponse: any;
  constructor(
    private restaurantService: RestaurantService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    protected alertService: AlertService
  ) {}

  ngOnInit() {
    this.restaurants = this.restaurantService
      .getAdminRestaurants()
      .subscribe((restaurants) => (this.restaurants = restaurants));

    this.restaurantForm = new FormGroup({
      Name_of_the_Restaurant: new FormControl(null, Validators.required),
      Cuisine: new FormControl(null, Validators.required),
      restaurantImage: new FormControl(null),
    });

    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.restaurantService.getRestaurant(this.id).subscribe((r) => {
        this.restaurant = r;
        this.imgPreview = this.restaurant.restaurantImage;
        this.restaurant.restaurantImage = "";
        console.log(this.restaurant);
        return;
      });
    } else {
      this.restaurantForm
        .get("restaurantImage")
        .setValidators([Validators.required]);
    }
  }

  onFileChange(event) {
    const file = event.target.files[0];
    this.image = file;
    if (this.id) {
      this.restaurantForm
        .get("restaurantImage")
        .setValidators([Validators.required]);
    }
  }

  get restaurantFormControls(): any {
    // tslint:disable-next-line: no-string-literal
    return this.restaurantForm["controls"];
  }
  onSubmit() {
    // form validation required
    this.submitted = true;

    if (this.restaurantForm.valid) {
      const restaurantFormInputs = this.restaurantForm.value;
      console.log(restaurantFormInputs, this.restaurantForm.controls);
      const formData = new FormData();
      Object.keys(restaurantFormInputs).forEach((element) => {
        formData.append(element, restaurantFormInputs[element]);
      });
      formData.set("restaurantImage", this.image);

      if (
        this.id &&
        formData.get("restaurantImage") === (undefined || "undefined")
      ) {
        formData.delete("restaurantImage");
      }
      if (this.restaurant && this.restaurant._id) {
        this.restaurantService
          .updateRestaurant(formData, this.restaurant._id)
          .subscribe((result) => {
            // tslint:disable-next-line: no-string-literal
            if (result["error"]) {
              // tslint:disable-next-line: no-string-literal
              this.alertService.error(result["error"], options);
              return false;
            }
            this.globalResponse = result;
            this.restaurantForm.reset();
            setTimeout(() => {
              // tslint:disable-next-line: no-string-literal
              this.alertService.success(result["message"], options);
            }, 1000);
            this.router.navigate(["admin/restaurants"]);
          });
      } else {
        this.restaurantService.addRestaurant(formData).subscribe((result) => {
          // tslint:disable-next-line: no-string-literal
          if (result["error"]) {
            // tslint:disable-next-line: no-string-literal
            this.alertService.error(result["error"], options);
            return false;
          }
          this.globalResponse = result;
          this.restaurantForm.reset();
          setTimeout(() => {
            // tslint:disable-next-line: no-string-literal
            this.alertService.success(result["message"], options);
          }, 1000);
          this.router.navigate(["admin/restaurants"]);
        });
      }
      console.log("Form Submitted");
    }
  }
}
