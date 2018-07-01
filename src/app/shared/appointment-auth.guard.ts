import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentAuthGuard implements CanActivate {

  constructor (private userService: UserService,
               private router: Router) {}

  canActivate(): boolean {
    if (this.userService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login-register']);
      return false;
    }
  }
}
