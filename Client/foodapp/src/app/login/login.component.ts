import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/_alert/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';

const options = {
  autoClose: true,
  keepAfterRouteChange: true,
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  Email = '';
  Password = '';

  // tslint:disable-next-line: max-line-length
  constructor(
    public userService: UserService,
    private router: Router,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
  ) {}

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    // start loader
    this.spinner.show();

    this.userService.login(this.loginForm.value).subscribe((res) => {
      if (res.status) {
        localStorage.setItem('userToken', res.token);
        localStorage.setItem('userProfile', JSON.stringify(res.userDetails));
        this.userService.updateUserName(false);
        setTimeout(() => {
          // stop
          this.spinner.hide();

          this.router.navigate(['/']);
        }, 100);
        this.alertService.info('Logged In!!', options);
      } else {
        this.alertService.error(res.message);
        // stop
        this.spinner.hide();
      }
    });
  }

  ngOnInit() {
    if (this.userService.getUserProfile().UserName !== '') {
      this.router.navigate(['/']);
      return false;
    }

    this.loginForm = new FormGroup({
      Email: new FormControl(null, Validators.required),
      Password: new FormControl(null, Validators.required),
    });
  }
}
