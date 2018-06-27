import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.component.html',
  styleUrls: ['./login-reg.component.css']
})
export class LoginRegComponent {

  login: boolean;
  registerForm: FormGroup;
  loginForm: FormGroup;
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      'firstName': [null, [Validators.minLength(3), Validators.maxLength(40), Validators.required]],
      'lastName' : [null, [Validators.minLength(3), Validators.maxLength(40), Validators.required]],
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null, [Validators.required, Validators.minLength(7), Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{7,})/)]]
    });

    this.loginForm = this.fb.group({
      'email' : [null, Validators.compose([Validators.required, Validators.email])],
      'password' : [null, [Validators.required, Validators.minLength(7), Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{7,})/)]]
    });
  }

  loginAppears() {
    this.login = !this.login;
  }
}
