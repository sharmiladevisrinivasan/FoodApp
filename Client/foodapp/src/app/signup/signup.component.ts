import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,

} from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { AlertService } from '../_alert';

const options = {
  autoClose: false,
};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    public userService: UserService,
    private router: Router,
    protected alertService: AlertService
  ) {}
  signupForm: FormGroup;
  Email = '';
  Password = '';
  UserName = '';
  BillingAddress = '';
  UserType: any[] = ['Customer', 'Merchant'];
  errorMessage: any = null;
  usersEmailcheck: any;

  emailAlreadyExist = '';
  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    console.log(this.signupForm.value);

    this.userService.signup(this.signupForm.value).subscribe((res) => {
      if (res.errorMessage) {
        this.errorMessage = res.message;
        return false;
      }

      if (res.status) {
        localStorage.setItem('userProfile', JSON.stringify(res.userDetails));
      }

      setTimeout(() => {
        this.alertService.success(
          'Registered Successfully.Please Login to continue!!',
          options
        );
      }, 1000);

      this.router.navigate(['login']);
    });
  }
  emailCheckUnique() {
    return this.userService.emailCheckUnique(
      this.signupForm.controls.Email.value
    );
  }
  ngOnInit() {
    this.signupForm = new FormGroup({
      UserName: new FormControl(null, Validators.required),
      Email: new FormControl(null, [Validators.required, Validators.email]),
      Password: new FormControl(null, Validators.required),
      BillingAddress: new FormControl(null, Validators.required),
      Country: new FormControl(null, Validators.required),
      State: new FormControl(null, Validators.required),
      Zip: new FormControl(null, Validators.required),
      UserType: new FormControl(null, Validators.required),
    });
  }
}
