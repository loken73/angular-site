import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootUrl = 'http://localhost:61165';
  constructor(private http: HttpClient) { }

    registerUser(user: User) {
      const body: User = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
      };
      return this.http.post(this.rootUrl + 'api/Account/Register', body);
    }
}
