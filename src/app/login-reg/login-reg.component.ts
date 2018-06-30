import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

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

  constructor(private fb: FormBuilder, private userService: UserService) {
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

  BindLoginUserModel() {
    this.loginForm.setValue({

    });
  }

  loginAppears() {
    this.login = !this.login;
  }

  onRegisterSubmit() {
    const regValues = this.registerForm.value;

    console.log(regValues);
  }
}
