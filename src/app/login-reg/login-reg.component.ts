import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.component.html',
  styleUrls: ['./login-reg.component.css']
})
export class LoginRegComponent {

  login: boolean;
  registerForm: FormGroup;
  loginForm: FormGroup;
  user: User;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private toastr: ToastrService,
              private router: Router) {
    this.CreateRegisterForm();

    this.CreateLoginForm();
  }

  CreateRegisterForm() {
    this.registerForm = this.fb.group({
      'firstName': [null, [Validators.minLength(3), Validators.maxLength(40), Validators.required]],
      'lastName' : [null, [Validators.minLength(3), Validators.maxLength(40), Validators.required]],
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null,
                    [Validators.required, Validators.minLength(7),
                    Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{7,})/)]]
    });
  }

  CreateLoginForm() {
    this.loginForm = this.fb.group({
      'email' : [null, Validators.compose([Validators.required, Validators.email])],
      'password' : [null, [Validators.required, Validators.minLength(7), Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{7,})/)]]
    });
  }

  loginAppears() {
    this.login = !this.login;
  }

  onRegisterSubmit() {
    const regValues: User = this.registerForm.value;
    this.userService.registerUser(regValues)
        .subscribe((res: any) => {
          if (res === null) {
            this.toastr.success('User Registration Successful. Please log in.');
            this.registerForm.reset();
            this.loginAppears();
          }
        });
  }

  onLoginSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.userService.loginUser(email, password)
        .subscribe((res: any) => {
          if (res.Succeeded !== null) {
            localStorage.setItem('Token', res);
            localStorage.setItem('User_Token', res.access_token);
            this.loginForm.reset();
            this.toastr.success('User Logged In');
            this.router.navigate(['appointment']);
          } else {
            this.toastr.error(res.Errors[0]);
          }
        });
  }
}
