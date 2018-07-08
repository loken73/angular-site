import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootUrl = 'http://localhost:61165/';
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

    loginUser(userName: string, password: string) {
      const urlEncode = 'username=' + userName + '&password=' + password + '&grant_type=password';
      const reqHeader = new HttpHeaders({'Content-Type' : 'x-www-urlencoded'});
      return this.http.post(this.rootUrl + 'Token', urlEncode, { headers : reqHeader });
    }

    loggedIn() {
      return !!localStorage.getItem('User_Token');
    }
}
